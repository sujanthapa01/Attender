import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
  Animated,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";

interface Tresult {
  presentDays: number;
  absentDays: number;
  result: number;
}

const { width, height } = Dimensions.get("window");

export default function Index() {
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [present, setPresent] = useState<string>("");
  const [absent, setAbsent] = useState<string>("");
  const [result, setResult] = useState<Tresult | null>(null);
  
  // Animation refs
  const resultAnimation = useRef(new Animated.Value(0)).current;
  const presentAnimation = useRef(new Animated.Value(0)).current;
  const absentAnimation = useRef(new Animated.Value(0)).current;
  const headlineAnimation = useRef(new Animated.Value(0)).current;
  const confettiAnimations = useRef([...Array(12)].map(() => new Animated.Value(0))).current;

  const presentInputRef = useRef<TextInput>(null);
  const absentInputRef = useRef<TextInput>(null);

  useEffect(() => {
    Animated.timing(headlineAnimation, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    if (result !== null) {
      Animated.parallel([
        Animated.spring(resultAnimation, {
          toValue: 1,
          useNativeDriver: true,
          speed: 8,
          bounciness: 12,
        }),
        Animated.stagger(100, [
          Animated.spring(presentAnimation, {
            toValue: 1,
            useNativeDriver: true,
            speed: 10,
          }),
          Animated.spring(absentAnimation, {
            toValue: 1,
            useNativeDriver: true,
            speed: 10,
          }),
        ]),
      ]).start();

      confettiAnimations.forEach((anim, index) => {
        Animated.sequence([
          Animated.delay(index * 50),
          Animated.timing(anim, {
            toValue: 1,
            duration: 1200,
            useNativeDriver: true,
          }),
        ]).start();
      });
    }
  }, [result]);

  function calculateAttendance() {
    if (!present || !absent) {
      Alert.alert("⚠️ Hold up!", "Both fields need values");
      return;
    }

    const presentDays = parseInt(present);
    const absentDays = parseInt(absent);

    if (presentDays < 0 || absentDays < 0) {
      Alert.alert("❌ Nope", "No negative days allowed!");
      return;
    }

    const total_attendance = presentDays + absentDays;

    if (total_attendance === 0) {
      Alert.alert("⚠️ Empty", "You need at least one day!");
      return;
    }

    const attendancePercentage = (presentDays / total_attendance) * 100;
    setResult({ presentDays, absentDays, result: attendancePercentage });
  }

  const resultScale = resultAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1],
  });

  const resultOpacity = resultAnimation;
  const presentScale = presentAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1],
  });
  const absentScale = absentAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1],
  });

  const headlineOpacity = headlineAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const headlineTranslate = headlineAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-30, 0],
  });

  const getResultColor = () => {
    if (!result) return "#6366f1";
    if (result.result >= 90) return "#10b981";
    if (result.result >= 75) return "#8b5cf6";
    if (result.result >= 60) return "#f59e0b";
    return "#ef4444";
  };

  const getResultEmoji = () => {
    if (!result) return "📊";
    if (result.result >= 90) return "🏆";
    if (result.result >= 75) return "⭐";
    if (result.result >= 60) return "👍";
    return "😟";
  };

  const getResultMessage = () => {
    if (!result) return "";
    if (result.result >= 90) return "Perfect! You're unstoppable! 🚀";
    if (result.result >= 75) return "Excellent work! Keep it up! 💪";
    if (result.result >= 60) return "Good effort! Room to improve 📈";
    return "Time to show up! 💯";
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const confettiPieces = confettiAnimations.map((anim, index) => {
    const rotation = (index * 30) % 360;
    const translateY = anim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -height * 0.6],
    });

    const opacity = anim.interpolate({
      inputRange: [0, 0.8, 1],
      outputRange: [1, 1, 0],
    });

    return (
      <Animated.View
        key={index}
        style={[
          {
            transform: [
              { translateY },
              { rotate: `${rotation}deg` },
            ],
            opacity,
          },
          style.confetti,
        ]}
      >
        <Text style={style.confettiEmoji}>
          {["🎉", "✨", "🌟", "💫", "⭐"][index % 5]}
        </Text>
      </Animated.View>
    );
  });

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={style.main}>
        <ScrollView
          style={style.scrollView}
          contentContainerStyle={style.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          scrollEnabled={true}
        >
          <View style={style.orbContainer}>
            <View style={[style.orb, style.orbPrimary]} />
            <View style={[style.orb, style.orbSecondary]} />
            <View style={[style.orb, style.orbTertiary]} />
          </View>

          <Animated.View
            style={[
              style.headerContainer,
              {
                opacity: headlineOpacity,
                transform: [{ translateY: headlineTranslate }],
              },
            ]}
          >
            <Text style={style.headerEmoji}>📚</Text>
            <Text style={style.header}>Attendance Tracker</Text>
            <Text style={style.subheader}>Your path to perfect attendance</Text>
            <View style={style.headerDivider} />
          </Animated.View>

          <View style={style.cardsContainer}>
            <Pressable
              onPress={() => presentInputRef.current?.focus()}
              style={({ pressed }) => [
                style.inputCard,
                focusedInput === "present" && style.inputCardFocused,
                pressed && style.inputCardPressed,
              ]}
            >
              <View style={style.cardHeader}>
                <Text style={style.cardEmoji}>✅</Text>
                <View style={style.cardTitleContainer}>
                  <Text style={style.cardTitle}>Days Present</Text>
                  <Text style={style.cardSubtitle}>Keep the streak alive</Text>
                </View>
              </View>

              <View style={style.inputField}>
                <TextInput
                  ref={presentInputRef}
                  style={style.textInput}
                  placeholder="0"
                  placeholderTextColor="#94a3b8"
                  onFocus={() => setFocusedInput("present")}
                  onBlur={() => setFocusedInput(null)}
                  onChangeText={setPresent}
                  value={present}
                  keyboardType="number-pad"
                />
                <Text style={style.inputSuffix}>days</Text>
              </View>
            </Pressable>

            <Pressable
              onPress={() => absentInputRef.current?.focus()}
              style={({ pressed }) => [
                style.inputCard,
                focusedInput === "absent" && style.inputCardFocused,
                pressed && style.inputCardPressed,
              ]}
            >
              <View style={style.cardHeader}>
                <Text style={style.cardEmoji}>❌</Text>
                <View style={style.cardTitleContainer}>
                  <Text style={style.cardTitle}>Days Absent</Text>
                  <Text style={style.cardSubtitle}>Minimize these days</Text>
                </View>
              </View>

              <View style={style.inputField}>
                <TextInput
                  ref={absentInputRef}
                  style={style.textInput}
                  placeholder="0"
                  placeholderTextColor="#94a3b8"
                  onFocus={() => setFocusedInput("absent")}
                  onBlur={() => setFocusedInput(null)}
                  onChangeText={setAbsent}
                  value={absent}
                  keyboardType="number-pad"
                />
                <Text style={style.inputSuffix}>days</Text>
              </View>
            </Pressable>
          </View>

          <Pressable
            style={({ pressed }) => [
              style.button,
              pressed && style.buttonPressed,
            ]}
            onPress={calculateAttendance}
          >
            <View style={style.buttonContent}>
              <Text style={style.buttonEmoji}>⚡</Text>
              <Text style={style.buttonText}>Calculate Attendance</Text>
              <Text style={style.buttonArrow}>→</Text>
            </View>
            <View style={style.buttonGlow} />
          </Pressable>

          {result !== null && (
            <>
              {confettiPieces}
              <Animated.View
                style={[
                  style.resultCard,
                  {
                    transform: [{ scale: resultScale }],
                    opacity: resultOpacity,
                  },
                ]}
              >
                <View
                  style={[
                    style.resultGradient,
                    { backgroundColor: getResultColor() },
                  ]}
                >
                  <View style={style.resultHeader}>
                    <View style={style.percentageCircle}>
                      <Text style={style.percentageValue}>
                        {result.result.toFixed(0)}%
                      </Text>
                      <Text style={style.percentageEmoji}>
                        {getResultEmoji()}
                      </Text>
                    </View>
                    <Text style={style.resultMessage}>
                      {getResultMessage()}
                    </Text>
                  </View>

                  <View style={style.statsGrid}>
                    <Animated.View
                      style={[
                        style.statCard,
                        {
                          transform: [{ scale: presentScale }],
                        },
                      ]}
                    >
                      <Text style={style.statIcon}>✓</Text>
                      <Text style={style.statLabel}>Present</Text>
                      <Text style={style.statValue}>
                        {result.presentDays}
                      </Text>
                      <Text style={style.statUnit}>days</Text>
                    </Animated.View>

                    <Animated.View
                      style={[
                        style.statCard,
                        {
                          transform: [{ scale: absentScale }],
                        },
                      ]}
                    >
                      <Text style={style.statIcon}>✗</Text>
                      <Text style={style.statLabel}>Absent</Text>
                      <Text style={style.statValue}>
                        {result.absentDays}
                      </Text>
                      <Text style={style.statUnit}>days</Text>
                    </Animated.View>
                  </View>

                  <View style={style.progressContainer}>
                    <View
                      style={[
                        style.progressBar,
                        {
                          width: `${result.result}%`,
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                        },
                      ]}
                    />
                  </View>

                  <Text style={style.totalDays}>
                    Total: {result.presentDays + result.absentDays} days
                  </Text>
                </View>
              </Animated.View>
            </>
          )}

          <View style={style.decorativeBottom} />
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const style = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#0f172a",
    overflow: "hidden",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 30,
    paddingBottom: 50,
  },
  orbContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  orb: {
    position: "absolute",
    borderRadius: 500,
    opacity: 0.08,
  },
  orbPrimary: {
    width: 400,
    height: 400,
    top: -100,
    right: -80,
    backgroundColor: "#6366f1",
  },
  orbSecondary: {
    width: 300,
    height: 300,
    bottom: 200,
    left: -50,
    backgroundColor: "#8b5cf6",
  },
  orbTertiary: {
    width: 250,
    height: 250,
    bottom: -50,
    right: 100,
    backgroundColor: "#10b981",
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 50,
    marginTop: 10,
  },
  headerEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  header: {
    fontSize: 42,
    fontWeight: "900",
    color: "#ffffff",
    letterSpacing: -1,
    marginBottom: 8,
    textAlign: "center",
  },
  subheader: {
    fontSize: 15,
    color: "#cbd5e1",
    fontWeight: "500",
    letterSpacing: 0.3,
    marginBottom: 16,
  },
  headerDivider: {
    width: 50,
    height: 3,
    backgroundColor: "#6366f1",
    borderRadius: 2,
  },
  cardsContainer: {
    gap: 16,
    marginBottom: 24,
  },
  inputCard: {
    backgroundColor: "#1e293b",
    borderRadius: 20,
    padding: 18,
    borderWidth: 2,
    borderColor: "#334155",
  },
  inputCardFocused: {
    borderColor: "#6366f1",
    backgroundColor: "#0f172a",
    shadowColor: "#6366f1",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 12,
  },
  inputCardPressed: {
    opacity: 0.8,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 14,
  },
  cardEmoji: {
    fontSize: 28,
  },
  cardTitleContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#f1f5f9",
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: 12,
    color: "#94a3b8",
    fontWeight: "400",
  },
  inputField: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(15, 23, 42, 0.4)",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 32,
    fontWeight: "800",
    color: "#6366f1",
    padding: 0,
  },
  inputSuffix: {
    fontSize: 13,
    color: "#64748b",
    fontWeight: "600",
    marginLeft: 8,
  },
  button: {
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 30,
    elevation: 8,
    shadowColor: "#6366f1",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonContent: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#6366f1",
  },
  buttonGlow: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(99, 102, 241, 0.3)",
    borderRadius: 18,
  },
  buttonEmoji: {
    fontSize: 22,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#ffffff",
    letterSpacing: 0.4,
  },
  buttonArrow: {
    fontSize: 20,
    color: "#ffffff",
    fontWeight: "bold",
  },
  resultCard: {
    borderRadius: 24,
    overflow: "hidden",
    marginBottom: 20,
    elevation: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
  },
  resultGradient: {
    padding: 28,
  },
  resultHeader: {
    alignItems: "center",
    marginBottom: 28,
  },
  percentageCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 3,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  percentageValue: {
    fontSize: 56,
    fontWeight: "900",
    color: "#ffffff",
    letterSpacing: -2,
  },
  percentageEmoji: {
    fontSize: 32,
    marginTop: 4,
  },
  resultMessage: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
    letterSpacing: 0.3,
    textAlign: "center",
  },
  statsGrid: {
    flexDirection: "row",
    gap: 14,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  statIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.8)",
    fontWeight: "600",
    marginBottom: 6,
  },
  statValue: {
    fontSize: 32,
    fontWeight: "900",
    color: "#ffffff",
    letterSpacing: -1,
  },
  statUnit: {
    fontSize: 11,
    color: "rgba(255, 255, 255, 0.7)",
    fontWeight: "600",
    marginTop: 2,
  },
  progressContainer: {
    height: 6,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 3,
    overflow: "hidden",
    marginBottom: 16,
  },
  progressBar: {
    height: "100%",
    borderRadius: 3,
  },
  totalDays: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    fontWeight: "600",
    textAlign: "center",
    letterSpacing: 0.3,
  },
  confetti: {
    position: "absolute",
    left: width / 2 - 10,
    top: height / 2 - 100,
  },
  confettiEmoji: {
    fontSize: 24,
  },
  decorativeBottom: {
    height: 40,
  },
});

import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Animated,
  TouchableWithoutFeedback,
  Keyboard,
  Linking,
  Alert,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function AboutScreen() {
  const scrollViewRef = useRef<ScrollView>(null);
  const headerAnim = useRef(new Animated.Value(0)).current;
  const coffeeButtonAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(headerAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(coffeeButtonAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(coffeeButtonAnim, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, 1000);
  }, []);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const openLink = async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      Alert.alert("Error", "Could not open link");
    }
  };

  const handleBuyMeCoffee = () => {
    Alert.alert(
      "Buy Me a Coffee ☕",
      "You're about to support me by buying a coffee. Thank you!",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Continue",
          onPress: () => {
            // Replace with your actual buy me a coffee link
            openLink("https://buymeacoffee.com/sujanthapam");
          },
        },
      ]
    );
  };

  const headerOpacity = headerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const headerTranslate = headerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-30, 0],
  });

  const coffeeScale = coffeeButtonAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.05],
  });

  const Card = ({ children }: { children: React.ReactNode }) => (
    <View style={style.card}>{children}</View>
  );

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={style.main}>
        <ScrollView
          ref={scrollViewRef}
          style={style.scrollView}
          contentContainerStyle={style.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Background Orbs */}
          <View style={style.orbContainer}>
            <View style={[style.orb, style.orbPrimary]} />
            <View style={[style.orb, style.orbSecondary]} />
          </View>

          {/* Header */}
          <Animated.View
            style={[
              style.headerSection,
              {
                opacity: headerOpacity,
                transform: [{ translateY: headerTranslate }],
              },
            ]}
          >
            <Text style={style.headerEmoji}>📚</Text>
            <Text style={style.headerTitle}>Attendance Tracker</Text>
            <Text style={style.headerVersion}>Version 1.0.0</Text>
            <View style={style.headerDivider} />
          </Animated.View>

          {/* About App Section */}
          <Card>
            <View style={style.cardHeader}>
              <View style={style.cardIconContainer}>
                <Ionicons name="information-circle" size={28} color="#6366f1" />
              </View>
              <View>
                <Text style={style.cardTitle}>About the App</Text>
                <Text style={style.cardSubtitle}>What is this app?</Text>
              </View>
            </View>

            <View style={style.cardContent}>
              <Text style={style.cardText}>
                Attendance Tracker is a beautiful, modern app designed to help you
                monitor and manage your attendance records with ease. It provides
                instant calculation of your attendance percentage with a stunning
                user interface.
              </Text>

              <View style={style.highlightBox}>
                <Text style={style.highlightTitle}>Key Highlights:</Text>
                <Text style={style.highlightItem}>• Track present and absent days</Text>
                <Text style={style.highlightItem}>• Calculate percentage instantly</Text>
                <Text style={style.highlightItem}>• Beautiful animated interface</Text>
                <Text style={style.highlightItem}>• Color-coded results</Text>
              </View>
            </View>
          </Card>

          {/* About Developer Section */}
          <Card>
            <View style={style.cardHeader}>
              <View style={style.cardIconContainer}>
                <Ionicons name="person-circle" size={28} color="#8b5cf6" />
              </View>
              <View>
                <Text style={style.cardTitle}>About the Developer</Text>
                <Text style={style.cardSubtitle}>Meet the creator</Text>
              </View>
            </View>

            <View style={style.cardContent}>
              <View style={style.devAvatarContainer}>
                <Text style={style.devAvatar}>👨‍💻</Text>
              </View>

              <Text style={style.devName}>Sujan Thapa</Text>

<Text style={style.devRole}>
  Backend-Focused Full Stack Developer
</Text>

<Text style={style.devBio}>
  I specialize in backend engineering with NestJS, building scalable APIs
  and robust systems. I also develop modern web apps with Next.js and
  mobile apps using React Native & Expo, with a strong interest in AI-powered solutions.
</Text>

              <View style={style.devSocialLinks}>
                <Pressable
                  style={({ pressed }) => [
                    style.socialButton,
                    pressed && style.socialButtonPressed,
                  ]}
                  onPress={() => openLink("https://github.com/sujanthapa01")}
                >
                  <Ionicons name="logo-github" size={20} color="#ffffff" />
                  <Text style={style.socialButtonText}>GitHub</Text>
                </Pressable>

                <Pressable
                  style={({ pressed }) => [
                    style.socialButton,
                    pressed && style.socialButtonPressed,
                  ]}
                  onPress={() => openLink("https://www.linkedin.com/in/sujanthapast0")}
                >
                  <Ionicons name="logo-linkedin" size={20} color="#ffffff" />
                  <Text style={style.socialButtonText}>LinkedIn</Text>
                </Pressable>

                <Pressable
                  style={({ pressed }) => [
                    style.socialButton,
                    pressed && style.socialButtonPressed,
                  ]}
                  onPress={() => openLink("mailto:your.sujanthapa4001@gmail.com")}
                >
                  <Ionicons name="mail" size={20} color="#ffffff" />
                  <Text style={style.socialButtonText}>Email</Text>
                </Pressable>
              </View>
            </View>
          </Card>

          {/* Buy Me a Coffee Section */}
          <Card>
            <View style={style.cardContent}>
              <Text style={style.coffeeMessage}>
                If you find this app useful and enjoy using it, consider buying me
                a coffee! Your support helps me continue building amazing apps.
              </Text>

              <Animated.View
                style={[
                  style.coffeeImageContainer,
                  {
                    transform: [{ scale: coffeeScale }],
                  },
                ]}
              >
                <Image
                  source={require("../../assets/images/bmc-logo-yellow.png")}
                  style={style.coffeeImage}
                  resizeMode="contain"
                />
              </Animated.View>

              <Pressable
                style={({ pressed }) => [
                  style.coffeeButtonMain,
                  pressed && style.coffeeButtonMainPressed,
                ]}
                onPress={handleBuyMeCoffee}
              >
                <Image
                  source={require("../../assets/images/bmc-logo-yellow.png")}
                  style={style.coffeeLogo}
                  resizeMode="contain"
                />
                <Text style={style.coffeeButtonText}>
                  Buy me a Coffee
                </Text>
              </Pressable>

              <View style={style.coffeeNote}>
                <Ionicons name="heart" size={18} color="#d97706" />
                <Text style={style.coffeeNoteText}>
                  Every coffee helps me invest in better tools and create new apps!
                </Text>
              </View>
            </View>
          </Card>

          {/* Footer */}
          <View style={style.footer}>
            <Text style={style.footerText}>Made with 💜 by Sujan Thapa</Text>
            <Text style={style.footerSubtext}>
              © 2024 All Rights Reserved
            </Text>
          </View>

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
  headerSection: {
    alignItems: "center",
    marginBottom: 40,
    marginTop: 10,
  },
  headerEmoji: {
    fontSize: 52,
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 38,
    fontWeight: "900",
    color: "#ffffff",
    letterSpacing: -1,
    marginBottom: 8,
  },
  headerVersion: {
    fontSize: 13,
    color: "#94a3b8",
    fontWeight: "600",
    letterSpacing: 0.5,
    marginBottom: 16,
  },
  headerDivider: {
    width: 50,
    height: 3,
    backgroundColor: "#6366f1",
    borderRadius: 2,
  },
  card: {
    backgroundColor: "#1e293b",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#334155",
    marginBottom: 20,
    overflow: "hidden",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 14,
    padding: 18,
    borderBottomColor: "#334155",
    borderBottomWidth: 1,
  },
  cardIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: "rgba(99, 102, 241, 0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#f1f5f9",
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 13,
    color: "#94a3b8",
    fontWeight: "500",
  },
  cardContent: {
    padding: 18,
  },
  cardText: {
    fontSize: 14,
    color: "#cbd5e1",
    lineHeight: 22,
    fontWeight: "500",
    marginBottom: 16,
  },
  highlightBox: {
    backgroundColor: "rgba(99, 102, 241, 0.1)",
    borderLeftColor: "#6366f1",
    borderLeftWidth: 3,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
  },
  highlightTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#f1f5f9",
    marginBottom: 8,
  },
  highlightItem: {
    fontSize: 12,
    color: "#cbd5e1",
    lineHeight: 18,
    fontWeight: "500",
  },
  devAvatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(139, 92, 246, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    alignSelf: "center",
  },
  devAvatar: {
    fontSize: 48,
  },
  devName: {
    fontSize: 22,
    fontWeight: "800",
    color: "#ffffff",
    marginBottom: 6,
    textAlign: "center",
  },
  devRole: {
    fontSize: 14,
    color: "#8b5cf6",
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
  },
  devBio: {
    fontSize: 13,
    color: "#cbd5e1",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 18,
 },
  devSocialLinks: {
    gap: 10,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: "rgba(139, 92, 246, 0.3)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(139, 92, 246, 0.5)",
  },
  socialButtonPressed: {
    opacity: 0.7,
  },
  socialButtonText: {
    flex: 1,
    fontSize: 14,
    color: "#f1f5f9",
    fontWeight: "600",
  },
  coffeeMessage: {
    fontSize: 14,
    color: "#cbd5e1",
    lineHeight: 22,
    fontWeight: "500",
    marginBottom: 18,
    textAlign: "center",
  },
  coffeeImageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  coffeeImage: {
    width: "100%",
    height: 120,
    borderRadius: 16,
  },
  coffeeButtonMain: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: "#fbbf24",
    borderRadius: 16,
    marginBottom: 16,
    elevation: 4,
    shadowColor: "#fbbf24",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  coffeeButtonMainPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  coffeeLogo: {
    width: 24,
    height: 24,
  },
  coffeeButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000000",
  },
  coffeeNote: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "rgba(217, 119, 6, 0.1)",
    borderRadius: 10,
    borderLeftWidth: 3,
    borderLeftColor: "#d97706",
  },
  coffeeNoteText: {
    flex: 1,
    fontSize: 12,
    color: "#fde047",
    fontWeight: "500",
    lineHeight: 18,
  },
  footer: {
    alignItems: "center",
    marginTop: 30,
    paddingVertical: 20,
    borderTopColor: "#334155",
    borderTopWidth: 1,
  },
  footerText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#f1f5f9",
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    color: "#64748b",
    fontWeight: "500",
  },
  decorativeBottom: {
    height: 40,
  },
});
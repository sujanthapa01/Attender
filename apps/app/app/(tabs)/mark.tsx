import { View, Text, StyleSheet, Pressable } from "react-native";
import { useAttendance } from "../../context/AttendanceContext";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";

export default function MarkScreen() {
  const { logout } = useAuth();
  const { markAttendance, setSubjectId, setStatus } = useAttendance();

  useEffect(() => {
    setSubjectId("c1a00000-0000-0000-0000-000000000001");
  }, []);

  return (
 <View style={style.main}>
      <View style={style.wrapper}>
        <Pressable
          onPress={() => setStatus("present" as any)}
          style={style.presentBtn}
        >
          <Text style={style.text}>Present</Text>
        </Pressable>

        <Pressable
          onPress={() => setStatus("absent" as any)}
          style={style.AbsentBtn}
        >
          <Text style={style.text}>Absent</Text>
        </Pressable>
      </View>

      <Pressable onPress={markAttendance} style={style.submitBtn}>
        <Text style={style.text}>Submit Attendance</Text>
      </Pressable>

      <Pressable onPress={logout} style={style.logoutBtn}>
        <Text style={style.text}>Logout</Text>
      </Pressable>
    </View>


  );
}

const style = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  wrapper: {
    flexDirection: "column",
    gap: 24,
  },

  presentBtn: {
    borderWidth: 2,
    borderColor: "black",
    paddingHorizontal: 62,
    paddingVertical: 12,
    backgroundColor: "#08CB00",
    borderRadius: 12,
  },

  AbsentBtn: {
    borderWidth: 2,
    borderColor: "black",
    paddingHorizontal: 62,
    paddingVertical: 12,
    backgroundColor: "#C44A3A",
    borderRadius: 12,
  },

  submitBtn: {
    marginTop: 30,
    paddingHorizontal: 50,
    paddingVertical: 12,
    backgroundColor: "#6366f1",
    borderRadius: 12,
  },

  logoutBtn: {
    marginTop: 20,
    paddingHorizontal: 50,
    paddingVertical: 12,
    backgroundColor: "#1e293b",
    borderRadius: 12,
  },

  text: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
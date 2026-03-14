import React, { createContext, useContext, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";
import { useAuth } from "../context/AuthContext";

type AttendanceContextType = {
  subjectId: string | null;
  setSubjectId: React.Dispatch<React.SetStateAction<string | null>>;
  markAttendance: () => Promise<void>;
  setStatus: React.Dispatch<React.SetStateAction<status | null>>;
  status: status | null;
};

enum status {
  PRESENT = "present",
  ABSENT = "absent",
}

const AttendanceContext = createContext<AttendanceContextType | undefined>(
  undefined,
);

export const AttendanceProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [subjectId, setSubjectId] = useState<string | null>(null);
  const [status, setStatus] = useState<status | null>(null);

  const { user,token } = useAuth();

  async function markAttendance() {
    const userId = user?.id;

    console.log("userId:", userId);

    if (!userId) {
      Alert.alert("User not logged in yet");
      return;
    }

    if (!subjectId) {
      Alert.alert("Subject id not found");
      return;
    }

    if (!status) {
      Alert.alert("Select attendance status");
      return;
    }

    try {
      const result = await fetch(
        "http://192.168.29.223:3000/api/attendance/mark",
        {
          method: "POST",
          headers: { "Content-Type": "application/json",  Authorization: `Bearer ${token}`},
          body: JSON.stringify({
            userId,
            subjectId,
            status,
          }),
        },
      );

      const data = await result.json();
      console.log("attendance response:", data);
    } catch (err) {
      console.log(err);
      throw new Error("error to markAttendance");
    }
  }

  return (
    <AttendanceContext.Provider
      value={{ subjectId, setSubjectId, markAttendance, setStatus, status }}
    >
      {children}
    </AttendanceContext.Provider>
  );
};

export const useAttendance = () => {
  const context = useContext(AttendanceContext);

  if (!context) {
    throw new Error("useAttendance must be used within AttendanceProvider");
  }

  return context;
};

import useLocalStorage from "./useLocalStorage.js";

export default function useProfile() {
  const [profile, setProfile] = useLocalStorage("profile", {
    name: "User",
    college: "ABC College",
    avatar: null,
  });

  return { profile, setProfile };
}

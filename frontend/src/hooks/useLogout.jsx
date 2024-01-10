import { useAuthContext } from "./useAuthContext";
// import { useWorkoutContext } from "./useWorkoutContext";


// Custom hook for handling logout functionality
export const useLogout = () => {
  const { dispatch } = useAuthContext()
  // const { dispatch: pratimoDispatch } = useWorkoutContext()

  const logout = () => {
    localStorage.removeItem('user');

    
    dispatch({ type: 'LOGOUT' });

  };

  return { logout };
};
import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getTokenFromLocalStorage, setTokenToLocalStorage } from "../helpers/manageAuthToken";
import { VENDOR_SEARCH_ROUTE, LOGIN_ROUTE, QUEUE_START_ROUTE } from "../constants/routes";
import { useDispatch, useSelector } from "react-redux";
import { useAppSelector } from "./reduxHooks";
import {useGetHomeRoute} from "./useGetHomeRoute";
import { getLoggedUser } from "../store/auth/authAction";
//import { AppState } from "../store/reducers/rootReducer";
//import { getloggedUser } from "../store/actions/userAction";
// import { fetchProfile } from "../store/redux/profile/profileActions";
// import { setAuthToken } from "../store/redux/user/userSlice";
// import { useAppSelector } from "./reduxHooks";

const useIsAuthenticated = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authResponse , authResponseError, authResponseLoading} = useAppSelector((state) => state.auth);
  const redirectRoute = useGetHomeRoute();
  // const { profileResponse } = useAppSelector((state) => state.profile);

  useEffect(() => {
    if(authResponse && !authResponseError && !authResponseLoading){
      navigate(VENDOR_SEARCH_ROUTE);
      setAuthenticated(true);
      return;
    }

    const token = getTokenFromLocalStorage("user");
    if (!token) {
      navigate(LOGIN_ROUTE);
      setAuthenticated(false);
      return;
    }

    if (!authResponse && token) {
      dispatch<any>(getLoggedUser(token));
    }
  }, []);

  useEffect(()=>{
    if(authResponse && !authResponseError && !authResponseLoading){
      setTokenToLocalStorage("user", authResponse.access_token);
      navigate(redirectRoute);
      setAuthenticated(true);
      return;
    }else{
      navigate(LOGIN_ROUTE);
      setAuthenticated(false);
      return;
    }

  },[authResponse, authResponseError, authResponseLoading])

  return authenticated;
};

export default useIsAuthenticated;
//export {};
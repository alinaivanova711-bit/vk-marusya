import { useQuery } from "@tanstack/react-query";
import { Loader } from "../Loader";
import { AuthForm } from "../AuthForm";
import { fetchMe } from "../../api/auth"

export const Account = () => {
    const { status, data } = useQuery(
        {
            queryFn: fetchMe,
            queryKey: ["users", "me"],
            retry: false,
        }
    )
    switch(status){
        case "pending":
            return <Loader/>
        case "error":
            return <AuthForm/>
        case "success":
            return (
            <>

            </>
            )
        
    }
}; 

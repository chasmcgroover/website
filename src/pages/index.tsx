import Link from "next/link";
import { useEffect } from "react";

export default function Index(){
  useEffect(()=>{
    redirect()
  })
  function redirect(){
    window.location.href = "/top"
  }
  return(
    <>
      <Link onClick={redirect} href={""}>Click here if you are not automatically redirected...</Link>
    </>
  );
}
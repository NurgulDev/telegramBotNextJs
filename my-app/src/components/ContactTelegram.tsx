"use client";
import React from "react";
import scss from "./ContactTelegram.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";

interface IFormTelegram {
 username: string;
 subject: string;
 description: string;
 email: string;
}

const ContactTelegram = () => {
 const { register, handleSubmit, reset } = useForm<IFormTelegram>();

 const TOKEN = process.env.NEXT_PUBLIC_TG_TOKEN;
 const CHAT_ID = process.env.NEXT_PUBLIC_TG_CHAT_ID;
 console.log(TOKEN);

 const messageModel = (data: IFormTelegram) => {
  let messageTG = `Username: <b>${data.username}</b>\n`;
  messageTG += `Subject: <b>${data.subject}</b>\n`;
  messageTG += `Description: <b>${data.description}</b>\n`;
  messageTG += `Email: <b>${data.email}</b>`;
  return messageTG;
 };

 const onSubmit: SubmitHandler<IFormTelegram> = async (data) => {
  await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
   chat_id: CHAT_ID,
   parse_mode: "html",
   text: messageModel(data),
  });
 };

 return (
  <div className={scss.ContactTelegram}>
   <div className="container">
    <div className={scss.content}>
     <h1>ContactTelegram</h1>
     <form onSubmit={handleSubmit(onSubmit)}>
      <input
       placeholder="username"
       type="text"
       {...register("username", { required: true })}
      />
      <input
       placeholder="subject"
       type="text"
       {...register("subject", { required: true })}
      />
      <input
       placeholder="description"
       type="text"
       {...register("description", { required: true })}
      />
      <input
       placeholder="email"
       type="text"
       {...register("email", { required: true })}
      />
      <button type="submit">Submit</button>
     </form>
    </div>
   </div>
  </div>
 );
};

export default ContactTelegram;

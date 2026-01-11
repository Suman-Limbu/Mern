import { Resend } from 'resend';
import config from '../config/config.js';

const resend = new Resend(config.emailApiKey);

async function sendEmail(recipent,{subject,message}){
  const { data, error } = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: ['sumanscoopie123@gmail.com'],
    subject: 'Hello World',
    html: '<strong>It works!</strong>',
  });

  if (error) 
  throw error;

  console.log({ data });
};
export default sendEmail;
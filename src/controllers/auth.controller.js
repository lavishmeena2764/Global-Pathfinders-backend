import {
    response_200,
    response_400,
    response_404,
    response_500,
  } from '../utils/responseCodes.js';
  import { getJwt } from '../utils/password.js';
  
  export async function logIn(req, res) {
    const { email, password } = req.body;
    if (!(email && password)){
      return response_400(res, 'Some parameters are missing!');
    }
    
    try {
      
      if (email !== "admin@gmail.com") return response_404(res, "Wrong email!!");
      const checkPassword = password === "Admin@123";
      if (!checkPassword) return response_400(res, 'Password is incorrect');
      const jwtToken = getJwt({ email: email });
      return response_200(res, 'Log In Succesful', {
        email: email,
        secret: jwtToken,
      });
    } catch (error) {
      return response_500(res, 'Internal server error', error);
    }
  }
const postmark = require('postmark');
const { verifyToken } = require('./tokenService');
const { getUserById, editUser } = require('./UserServices');


// send Email common function passing to ,template alias in the post mark and the data arrray paas to the template
const SendEmail = async (to, data, Templatealias) => {
  const client = new postmark.ServerClient(process.env.POST_MARK);

  client
    .sendEmailWithTemplate({
      From: process.env.FROM_EMAIL.toString(),
      To: to ?? process.env.TO_DEFAULT_EMAIL.toString(),
      TemplateAlias: Templatealias ?? process.env.POST_MARK_FORGET_PASSWORD,
      TemplateModel: data,
    })
    .then((res) => {
      console.log("re", res);
      return res.ErrorCode === 0;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
const sendVerificationEmail = async (to, token) => {
  console.log(process.env.VERIFICATIONEMAILURL);
  // replace this url with the link to the email verification page of your front-end app
  const verificationEmailUrl = `${process.env.VERIFICATIONEMAILURL}${token}`;
  const data = {
    action_url: verificationEmailUrl,
  };
  const Templatealias = process.env.POST_MARK_EMAIL_VERIFICATION;
  console.log(data);
  await SendEmail(to, data, Templatealias);
};

// Postmark send email function template written in postmark and the alias is is used to identify template
const sendResetPasswordEmail = async (to, token) => {
    // const subject = 'Reset password';
    // replace this url with the link to the reset password page of your front-end app
    const resetPasswordUrl = `${process.env.RESETPASSWORDURL}${token}`;
    const data = {
        action_url: resetPasswordUrl,
    };
    const Templatealias = process.env.POST_MARK_FORGET_PASSWORD;
    await SendEmail(to, data, Templatealias);
  };
  
  const resetPassword = async (resetPasswordToken, newPassword) => {
    try {
      const resetPasswordTokenDoc = await verifyToken(resetPasswordToken, tokenTypes.RESET_PASSWORD);
      const user = await getUserById(resetPasswordTokenDoc.user);
      if (!user) {
        throw new Error();
      }
      await editUser(user.id, { password: newPassword });
      await Token.deleteMany({ user: user.id, type: tokenTypes.RESET_PASSWORD });
    } catch (error) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Password reset failed');
    }
  };

module.exports = {
    SendEmail,
    sendVerificationEmail,
    sendResetPasswordEmail,
    resetPassword
  };
  
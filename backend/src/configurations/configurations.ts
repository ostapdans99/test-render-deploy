const configurations = () => ({
  port: process.env.PORT,
  host: process.env.DB_HOST,
  secret_jwt_access: process.env.JWT_ACCESS_SECRET_TOKEN,
  expire_jwt_access: process.env.EXPIRE_JWT_ACCESS_TOKEN,
  secret_jwt_refresh: process.env.JWT_REFRESH_SECRET_TOKEN,
  expire_jwt_refresh: process.env.EXPIRE_JWT_REFRESH_TOKEN,
  smtp_host: process.env.SMTP_HOST,
  smtp_user: process.env.SMTP_USER,
  smtp_password: process.env.SMTP_PASSWORD,
  api_url: process.env.API_URL,
  client_url: process.env.CLIENT_URL,
});

export default configurations;

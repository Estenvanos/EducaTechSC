export function verifyAdminToken(req: Request) {
  const header = req.headers.get("authorization");

  if (!header) return false;

  const [type, token] = header.split(" ");

  if (type !== "Bearer") return false;

  return token === process.env.ADMIN_SECRET_TOKEN;
}

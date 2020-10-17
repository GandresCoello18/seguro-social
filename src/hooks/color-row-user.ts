export function ValidateStatusUser(status: string | any): string {
  switch (status) {
    case "registrado":
      return "secondary";
    case "activo":
      return "success";
    case "atrasado":
      return "danger";
    default:
      return "warning";
  }
}

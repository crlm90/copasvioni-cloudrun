import Swal, { SweetAlertIcon, SweetAlertResult } from "sweetalert2";

export class NotificationManager {
    public static showMessage(titleText: string, text: string, icon: SweetAlertIcon = "success", confirmButtonText = "OK"): Promise<SweetAlertResult<any>>{
        const color = icon === "error" ? "#DF1642" : "#30d5c9";
        return Swal.fire({
            icon,
            titleText,
            text,
            confirmButtonText,
            confirmButtonColor : color,
            iconColor: color,
        });
    }

    public static showConfirmationDialogue(titleText: string, text: string, confirmButtonText = "Ya", denyButtonText = "Tidak" ): Promise<SweetAlertResult<any>> {
        return Swal.fire({
            icon: "question",
            titleText,
            text,
            showDenyButton: true,
            confirmButtonText : confirmButtonText,
            denyButtonText: denyButtonText,
            reverseButtons: true,
            denyButtonColor: "#fff",
            confirmButtonColor : "#1aa7ec",
            iconColor: "#1aa7ec",
        });
    }
}

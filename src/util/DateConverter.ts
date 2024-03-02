export class DateConverter {
    static MONTH_NAME = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    static convertDateObjectToDateString(date: Date): string {
        const tanggal = date.getDate();
        const bulan = date.getMonth();
        const tahun = date.getFullYear();

        return `${tanggal} ${DateConverter.MONTH_NAME[bulan]} ${tahun}`;
    }

    static convertDateObjectToTimeString(date: Date): string {
        let hour = date.getHours().toString();
        if (hour.length === 1) hour = `0${hour}`;
        let minute = date.getMinutes().toString();
        if (minute.length === 1) minute = `0${minute}`;
        let second = date.getSeconds().toString();
        if (second.length === 1) second = `0${second}`;

        return `${hour}:${minute}:${second}`;
    }
}
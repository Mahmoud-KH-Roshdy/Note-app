
    export function time(timeObj:any): string {
        const seconds = timeObj.seconds || timeObj._seconds || timeObj;
        const date = new Date(seconds * 1000);
        return date.toLocaleDateString("en-US", { day: "numeric", month: "short" });
    }
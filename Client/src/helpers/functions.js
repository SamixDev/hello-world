export const getPathFromLocation = location => {
    const arr = location.pathname.split("/");
    return arr[arr.length - 1].toLowerCase();
}

export const intlCompactNumFormat = function (num, locale = "en-US") {
    return new Intl.NumberFormat(locale, {
        notation: "compact",
        compactDisplay: "short"
    }).format(num);
}

export const intlCurrNumFormat = function (num, curr = "usd", locale = 'en-US') {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: curr,
        minimumFractionDigits: 2
    }).format(num);
}

export const intlDecimalNumFormat = function (num, locale = 'en-US') {
    return new Intl.NumberFormat(locale, {
        style: "decimal",
        minimumFractionDigits: 2
    }).format(num);
}

export const intlShortDateFormat = function (date, locale = "en-US") {
    return new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "long"
    }).format(date);
}

export const trimAddress = (address, chars = 4) => {
    const checkUD = address.split("").indexOf(".");

    if(checkUD !== -1) {
        return address;
    } else {
        return `${address.slice(0, chars)}...${address.slice(-chars)}`;
    }
}

export const trimTokenId = tokenId => {
    const str = tokenId.split("");
    if(str.length > 10) {
        return `${tokenId.slice(0, 4)}...${tokenId.slice(-4)}`;
    } else {
        return tokenId;
    } 
}

export const timeSince = date => {
    let seconds = Math.floor((new Date() - date) / 1000);
    let interval = seconds / 31536000;
  
    if (interval > 1) {
      return Math.floor(interval) + "y";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + "mo";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + "d";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + "h";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + "m";
    }
    return Math.floor(seconds) + "s";
}

export const isAbortError = error => {
    if (error && error.name === "AbortError") {
        return true;
    }
    return false;
}

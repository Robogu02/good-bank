// Start the SDK and define CSID
cdApi.setCustomerSessionId("jgh875wdwlv0skue63");

document.addEventListener("DOMContentLoaded", function () {
    const currentPath = window.location.pathname;

    if (currentPath.includes("login.html")) {
        cdApi.changeContext("login_screen");
    } else if (currentPath.includes("account.html")) {
        cdApi.changeContext("account_overview_screen");
    } else if (currentPath.includes("payment.html")) {
        cdApi.changeContext("make_payment_screen");
    } else if (currentPath.includes("logout.html")) {
        cdApi.changeContext("logout_screen");
    } else {
        cdApi.changeContext("home_screen");
    }
});

function login() {
    const payload = {
        "customerId": "dummy",
        "action": "init",
        "customerSessionId": "jgh875wdwlv0skue63",
        "activityType": "LOGIN",
        "uuid": generateUUID(),
        "brand": "SD",
        "solution": "ATO",
        "iam": "student@example.com"
    };

    sendApiRequest(payload, () => {
        window.location.href = 'account.html';
    });
}

function makePayment() {
    const payload = {
        "customerId": "dummy",
        "action": "getScore",
        "customerSessionId": "jgh875wdwlv0skue63",
        "activityType": "MAKE_PAYMENT",
        "uuid": generateUUID(),
        "brand": "SD",
        "solution": "ATO",
        "iam": "student@example.com"
    };

    sendApiRequest(payload, () => {
        alert('Payment Successful!');
    });
}

function logout() {
    cdApi.setCustomerSessionId(null);
    window.location.href = 'logout.html';
}

function sendApiRequest(payload, callback) {
    fetch('https://hooks.zapier.com/hooks/catch/1888053/bgwofce/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(response => {
        if (response.status === 200) {
            callback();
        } else {
            alert('API request failed');
        }
    });
}

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0,
            v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

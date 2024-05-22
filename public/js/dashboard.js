$(document).ready(function () {
    var token = localStorage.getItem('token');
    if (token === undefined || token === null) {
        location.replace('/index.html');
    }

    $.ajax({
        type: "GET",
        url: "/dashboard/getTokenData",
        headers: {
            token: token
        },
        success: function (data, status, jqXHR) {
            localStorage.setItem("userId", data.data.id);
            localStorage.setItem("username", data.data.username);
            localStorage.setItem("role", data.data.role);
            localStorage.setItem("firstName", data.data.firstName);
            localStorage.setItem("middleName", data.data.middleName);
            localStorage.setItem("lastName", data.data.lastName);
            localStorage.setItem("profileImage", data.data.profileImage);
            localStorage.setItem("flatNo", data.data.flatNo);
            localStorage.setItem("blockNo", data.data.blockNo);
            localStorage.setItem("societyId", data.data.societyId);
            localStorage.setItem("flatArea", data.data.flatArea);
            localStorage.setItem("bankName", data.data.bankName);
            localStorage.setItem("bankAccount", data.data.bankAccount);
            localStorage.setItem("bankIfsc", data.data.bankIfsc);
            localStorage.setItem("bankAccountHolder", data.data.bankAccountHolder);
            localStorage.setItem("paymentQRCode", data.data.paymentQRCode);
            localStorage.setItem("paymentQRCodeDetail", data.data.paymentQRCodeDetail);
            var profileImage = localStorage.getItem("profileImage");
            if (profileImage == null || profileImage == '') {
            }
            else{
                $("#profileImage").attr("src", profileImage);
            }
            var name = localStorage.getItem('firstName') + ' ' + localStorage.getItem('lastName');
            $("#firstNameLastName").html(name);
        },

        error: function (jqXHR, status) {
            // error handler
            location.replace('/');
        }
    });

    $("#signout").click(function () {
        localStorage.removeItem('token');
        location.replace('/index.html');
    })
})
$(document).ready(function () {
    $("#submitBtn").click(function () {
        var username = $("#username").val();
        var password = $("#password").val();
        $.ajax({
            type: "POST",
            url: "/auth/authenticate",
            data: { 
                username: username,
                password: password
             },
            success: function (data, status, jqXHR) {
                localStorage.setItem("token", data.token);
                location.replace('/dashboard.html');
            },

            error: function (jqXHR, status) {
                // error handler
                $("#StatusResponse").html(JSON.stringify(JSON.parse(jqXHR.responseText).reason));
            }
        });
    });
})
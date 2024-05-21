$(document).ready(function () {
    function update() {
            var token = $("#tokenId").val();
            $.ajax({
                type: "POST",
                url: "/auth/tokenValidation",
                data: { token },// now data come in this function
                success: function (data, status, jqXHR) {
                    if (data === null) {
                        location.replace('/');
                    }
                },

                error: function (jqXHR, status) {
                    // error handler
                    location.replace('/');
                }
            });
    }
    setInterval(update, 300000);
})

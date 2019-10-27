//scrollspy
$("*").scrollspy({ target: ".navbar-nav" });

//smooth scrolling
$("#navbar a").on("click", function(e) {
    if (this.hash !== "") {
        e.preventDefault();
        const hash = this.hash;
        if (this.hash == "#header-section") {
            $("html, body").animate({ scrollTop: $(hash).offset().top },
                1000,
                function() {
                    // add hash to URL after scroll
                    window.location.hash = hash;
                }
            );
        } else {
            $("html, body").animate({ scrollTop: $(hash).offset().top },
                1000,
                function() {
                    // add hash to URL after scroll
                    window.location.hash = hash;
                }
            );
        }
    }
});

//hide navbar
window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    if (
        document.body.scrollTop > 600 ||
        document.documentElement.scrollTop > 600
    ) {
        document.getElementById("navbar").style.top = "0";
    } else {
        document.getElementById("navbar").style.top = "-100px";
    }
}

//submit contact form
function submitToAPI(e) {
    e.preventDefault();

    var Namere = /[A-Za-z]{1}[A-Za-z]/;
    if (!Namere.test($("#name").val())) {
        alert("Name can not less than 2 char");
        return;
    }
    if ($("#email").val() == "") {
        alert("Please enter your email id");
        return;
    }

    var reeamil = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,6})?$/;
    if (!reeamil.test($("#email").val())) {
        alert("Please enter valid email address");
        return;
    }

    var name = $("#name").val();
    var email = $("#email").val();
    var desc = $("#message").val();
    var data = {
        name: name,
        email: email,
        desc: desc
    };

    $.ajax({
        type: "POST",
        url: "https://hrr91hsbd8.execute-api.us-east-1.amazonaws.com/production/rest/contact",
        dataType: "json",
        crossDomain: "true",
        contentType: "application/json; charset=utf-8",

        data: JSON.stringify(data),

        success: function() {
            // clear form and show a success message
            alert(
                "Thanks for sending in your inquiry. A company representative should get in touch with you soon!"
            );
            document.getElementById("contact-form").reset();
            location.reload();
        },
        error: function() {
            // show an error message
            alert(
                "An error seems to have occurred. We are deeply sorry for any inconvenience caused. You may still email us directly at hello@konvex.io"
            );
        }
    });
}
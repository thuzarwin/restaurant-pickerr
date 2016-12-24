$(function() {
    toastr.options = {
        "closeButton": true,
        "progressBar": false,
        "positionClass": "toast-top-right"
    }
    NProgress.start();
    NProgress.configure({ easing: 'ease', speed: 800 });
    NProgress.done(true);

    $('[data-toggle="tooltip"]').tooltip()
});

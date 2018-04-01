$(document).ready(function() {
    const composerCompressed = $("#inlineComposerCompressed"),
          composedModal = $("#inlineComposerModal"),
          modalSurround = $(".modalSurround"),
          buttonCancel = $(".buttonCancel"),
          buttonConfirm = $(".buttonConfirm"),
          titleModal = $("input.threadTitleInput"),
          titleCharsLeft = $("div.charsLeft"),
          textAreaModal = $(".composerDropzone"),
          threadText = $("div#threadText");
    var titleLength = 0, 
        threadLength = 0;

    showModal = () => {
        composerCompressed.hide();
        composedModal.slideDown(200, () => {
            titleModal.focus();
        });
    }

    hideModal = () => {
        composedModal.hide();
        composerCompressed.show();
        $(threadText).html("");
        $(titleModal).val("");
        if ($(titleModal).hasClass('textSuperBold')) {
            $(titleModal).removeClass('textSuperBold');
        }
        if (!$(buttonConfirm).hasClass("buttonDisabled")) {
            $(buttonConfirm).addClass("buttonDisabled");    
        }
    }

    checkButtonStatus = () => {
        if ($(buttonConfirm).hasClass("buttonDisabled") && (titleLength || threadLength)) {
            $(buttonConfirm).removeClass("buttonDisabled");
        } else if (!$(buttonConfirm).hasClass("buttonDisabled") && !titleLength && !threadLength) {
            $(buttonConfirm).addClass("buttonDisabled");
        }
    }

    composerCompressed.click(() => { showModal() });
    modalSurround.click(() => { hideModal() });
    buttonCancel.click(() => hideModal());
    $(document).keyup((e) => {
        if (e.keyCode === 27 && $(composedModal).is(":visible")) { hideModal(); }
    });

    titleModal.on('input', (e) => {
        titleLength = e.target.value.length;
        if (titleLength == 0) {
            if ($(titleModal).hasClass('textSuperBold')) {
                $(titleModal).removeClass('textSuperBold');
            }
        } else {
            if (!$(titleModal).hasClass('textSuperBold')) { 
                $(titleModal).addClass('textSuperBold');
            }
        }
        titleCharsLeft.html(50-titleLength);

        checkButtonStatus();
    });

    textAreaModal.on('input', (e) => {
        threadLength = e.target.textContent.length;
        checkButtonStatus();
    })

    threadText.keydown((e) => {
        if (window.getSelection) {
            console.log(window.getSelection().toString());
            console.log(e);
        }
    })

});
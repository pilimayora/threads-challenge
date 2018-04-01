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
        
        updateTitleModal();
    }

    updateTitleModal = () => {
        titleLength = $(titleModal).val().length;
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

    }

    // Disable/Enable Post Button
    checkButtonStatus = () => {
        if ($(buttonConfirm).hasClass("buttonDisabled") && (titleLength || threadLength)) {
            $(buttonConfirm).removeClass("buttonDisabled");
        } else if (!$(buttonConfirm).hasClass("buttonDisabled") && !titleLength && !threadLength) {
            $(buttonConfirm).addClass("buttonDisabled");
        }
    }

    // Click event handlers
    composerCompressed.click(() => { showModal() });
    modalSurround.click(() => { hideModal() });
    buttonCancel.click(() => hideModal());
    
    // Escape button handler
    $(document).keyup((e) => {
        if (e.keyCode === 27 && $(composedModal).is(":visible")) { hideModal(); }
    });

    // Changes in Thread Title
    titleModal.on('input', (e) => {
        updateTitleModal();
        checkButtonStatus();
    });

    // Changes in Thread Text
    textAreaModal.on('input', (e) => {
        threadLength = e.target.textContent.length;
        checkButtonStatus();
    })

    // TODO: Bold/Underline/Itallic
    //
    // threadText.keydown((e) => {
    //     if (window.getSelection) {
    //         console.log(window.getSelection().toString());
    //         console.log(e);
    //     }
    // });

});
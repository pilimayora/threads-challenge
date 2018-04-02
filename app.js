$(document).ready(function() {
    const composerCompressed = $("#composerCompressed"),
          composerModal = $("#composerModal"),
          modalSurround = $("#modalSurround"),
          buttonCancel = $(".buttonCancel"),
          buttonConfirm = $(".buttonConfirm"),
          title = $("input.titleInput"),
          titleCharsLeft = $("div.charsLeft"),
          threadText = $("div.textContainer");
    var titleLength = 0, 
        threadLength = 0,
        selection;

    showModal = () => {
        composerCompressed.hide();
        composerModal.slideDown(200, () => {
            title.focus();
        });
    }

    hideModal = () => {
        composerModal.hide();
        composerCompressed.show();
        $(threadText).html("");
        $(title).val("");
        
        updateTitle();
    }

    updateTitle = () => {
        titleLength = $(title).val().length;
        if (titleLength == 0) {
            if ($(title).hasClass('textSuperBold')) {
                $(title).removeClass('textSuperBold');
            }
        } else {
            if (!$(title).hasClass('textSuperBold')) { 
                $(title).addClass('textSuperBold');
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
        if (e.keyCode === 27 && $(composerModal).is(":visible")) { hideModal(); }
    });

    // Changes in Thread Title
    title.on('input', (e) => {
        updateTitle();
        checkButtonStatus();
    });

    // Changes in Thread Text
    threadText.on('input', (e) => {
        threadLength = e.target.textContent.length;
        checkButtonStatus();
    })

    // Bold/Underline/Italic
    // threadText.keydown((e) => {
    //     if (window.getSelection) {
    //         selection = window.getSelection();
    //         if (selection.toString() != "") {
    //             if (e.metaKey || e.ctrlKey) {
    //                 switch (e.keyCode) {
    //                     case 66:
    //                         // Bold
    //                         var spanCss = {"font-weight": "bold"};
    //                         surroundSelection(selection, spanCss);
    //                         break;
    //                     case 73:
    //                         // Italic
    //                         var spanCss = {"font-style": "italic"};
    //                         surroundSelection(selection, spanCss);
    //                         break;
    //                     case 85:
    //                         // Underline
    //                         console.log("underline");
    //                         break;
    //                 }
    //             } 
    //         }
    //     }
    // });

});
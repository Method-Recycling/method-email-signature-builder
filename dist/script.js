(function (w) {
  var doc = w.document;
  var inputs = doc.querySelectorAll("form .input");
  var selectButtons = doc.querySelectorAll("[data-select]");
  var prepare = doc.querySelector("[data-prepare]");
  var download = doc.querySelector("[data-load]");

  var tableSignature = doc.querySelector("#signature > tbody");

  var checkPhone = doc.querySelector("#checkPhone");
  var mobileInput = doc.querySelector("#phone");
  var mobileWrap = doc.querySelector("#mobileWrap");
  var mobileLabel = doc.querySelector("#mobileLabel");

  var jobtitle = doc.querySelector("#jobtitle");
  var checkJobline = doc.querySelector("#check2ndJob");
  var joblineInput = doc.querySelector("#department");
  var joblineWrap = doc.querySelector("#editJobline");
  var jobSep = doc.querySelector("#jobSep");

  var checkTeams = doc.querySelector("#checkTeams");
  var teamsWrap = doc.querySelector("#teamsWrap");
  var teamsSplit = doc.querySelector("#teamsSplit");

  var checkAdditional = doc.querySelector("#checkAdditional");
  var additionalInput = doc.querySelector("#additional");
  var additionalWrap = doc.querySelector("#editAdditional");

  var qualsWrap = doc.querySelector("#editQuals");

  var checkPronouns = doc.querySelector("#checkPronouns");
  var pronounsInput = doc.querySelector("#pronouns");
  var pronounsWrap = doc.querySelector("#editPronouns");

  var banner = doc.querySelector("#checkImage");
  var bannerWrap = doc.querySelector("#imageWrap");
  var bannerInput = doc.querySelector("#image");

  var bannerLinkInput = doc.querySelector("#bannerLink");

  for (var i = inputs.length - 1; i >= 0; i--) {
    inputs[i].addEventListener("keyup", updateSignature);
  }

  checkPronouns.addEventListener("click", function () {
    if (!this.checked) {
      pronounsInput.disabled = true;
      removeHtmlNodes(pronounsWrap);
    } else {
      pronounsInput.disabled = false;
      addHtmlNodes(pronounsWrap, " (Pronouns)", "pronouns");
    }
  });

  checkJobline.addEventListener("click", function () {
    if (!this.checked) {
      joblineInput.disabled = true;
      removeHtmlNodes(joblineWrap);
      jobSep.innerHTML = "";
    } else {
      joblineInput.disabled = false;
      addHtmlNodes(joblineWrap, "Job line 2", "department");
      if (jobtitle.value) {
        jobSep.innerHTML = ", ";
      }
    }
  });

  checkPhone.addEventListener("click", function () {
    if (!this.checked) {
      mobileInput.disabled = true;
      removeHtmlNodes(mobileLabel);
      removeHtmlNodes(mobileWrap);
      addContactSplits();
    } else {
      mobileInput.disabled = false;
      mobileLabel.innerHTML = "<b>Mob: </b>";
      addHtmlNodes(mobileWrap, "+64 xx xxx xxxx", "phone");
      addContactSplits();
    }
  });

  checkTeams.addEventListener("click", function () {
    if (!this.checked) {
      removeHtmlNodes(teamsWrap);
      addContactSplits();
    } else {
      teamsWrap.innerHTML = "Book&nbsp;a&nbsp;Meeting&nbsp;With&nbsp;Me";
      addContactSplits();
    }
  });

  function addContactSplits() {
    if (teamsSplit) {
      teamsSplit.innerHTML =
        checkTeams.checked && checkPhone.checked ? " &nbsp;|&nbsp; " : "";
    }
  }

  checkAdditional.addEventListener("click", function () {
    if (!this.checked) {
      additionalInput.disabled = true;
      removeHtmlNodes(additionalWrap);
    } else {
      additionalInput.disabled = false;
      addHtmlNodes(additionalWrap, "Hours: 9am–5pm, Mon–Fri", "additional");
    }
  });

  bannerInput.addEventListener("change", function () {
    removeHtmlNodes(bannerWrap);
    var img = doc.createElement("img");
    var link = doc.createElement("a");
    img.width = "450";
    img.height = "100";
    
    link.href = bannerLinkInput.value || "https://www.methodrecycling.com";

    switch (bannerInput.value) {
      case "tri1-2024":
        img.src =
          "https://lh3.googleusercontent.com/d/1pWiNj4tnai1dTcZRbAu6ueBvjSt1zlNz";
        break;

      case "tri2-2024":
        img.src =
          "https://lh3.googleusercontent.com/d/1pWiNj4tnai1dTcZRbAu6ueBvjSt1zlNz";
        break;

      case "od_2024":
        img.src =
          "https://lh3.googleusercontent.com/d/1pWiNj4tnai1dTcZRbAu6ueBvjSt1zlNz";
        link.href =
          "https://www.whitireiaweltec.ac.nz/open-day-events-and-evenings-2024/";
        break;

      case "emerge-24":
        img.src =
          "https://www.whitireiaweltec.ac.nz/assets/Events/E_MERGE_EmailSig_450x170px_2024.jpg?vid=5";
        link.href = "https://teauahaevents.com/emerge";
        img.width = "450";
        img.height = "170";
        break;

      case "Feb-offer-25":
        img.src =
          "https://lh3.googleusercontent.com/d/1Lz9w6Bv0-zUYVnDFv5_Z9c3iyP0-Q9L2";
        break;

      case "None":
        removeHtmlNodes(bannerWrap);
        bannerWrap.style.setProperty("margin", "0px", "important");
        break;

      default:
        img.src = "";
        img.width = "1";
        img.height = "1";
        link.href = "#";
    }

    if (bannerInput.value === "None") {
      removeHtmlNodes(bannerWrap);
      bannerWrap.style.setProperty("margin", "0px", "important");
    } else {
      if (img.src) {
        img.classList.add("image");
        link.appendChild(img);
        bannerWrap.appendChild(link);
        bannerWrap.style.setProperty("margin-top", "10px", "important");
      }
    }
  });

  bannerLinkInput.addEventListener("change", function() {
    var link = bannerWrap.querySelector("a");
    if (link) {
      link.href = bannerLinkInput.value || "https://www.methodrecycling.com";
    }
  });

  document.addEventListener("DOMContentLoaded", function() {
    bannerInput.dispatchEvent(new Event("change"));
  });

  function removeBanner() {
    removeHtmlNodes(bannerWrap);
  }

  function addHtmlNodes(node, data, className) {
    var br = doc.createElement("br");
    var span = doc.createElement("span");
    span.classList.add(className);
    span.innerHTML = data;
    span.setAttribute(
      "style",
      "font-family: Aptos, Helvetica Neue, Arial, sans-serif; font-feature-settings: 'kern' 1, 'liga' 1;"
    );
    node.appendChild(span);
  }

  function addHtmlAndBreak(node, data, className) {
    var br = doc.createElement("br");
    var span = doc.createElement("span");
    span.classList.add(className);
    span.innerHTML = data;
    span.setAttribute(
      "style",
      "font-family: Aptos, Helvetica Neue, Arial, sans-serif; font-feature-settings: 'kern' 1, 'liga' 1;"
    );
    node.appendChild(span);
    node.appendChild(br);
  }

  function removeHtmlNodes(node) {
    node.innerHTML = "";
  }

  function updateSignature(e) {
    var id = e.target.id;
    var value = e.target.value;
    var element = doc.querySelector("." + id);

    switch (id) {
      case "email":
        element.innerHTML = value;
        element.href = value ? "mailto:" + value : ""; // Sets href to an empty string if value is empty
        if (checkTeams) {
          teamsWrap.href = value
            ? "https://teams.microsoft.com/l/call/0/0?users=$" + value
            : "#"; // Fallback to "#" if no email
        }
        break;
      case "pronouns":
        element.innerHTML = " (" + value + ")";
        break;
      case "quals":
        element.innerHTML = ", " + value;
        break;
      case "jobtitle":
        if (value.includes("|")) {
          const titles = value.split(" | ");
          element.innerHTML = "<b>" + titles[0] + " | </b>" + titles[1];
        } else {
          element.innerHTML = "<b>" + value + "</b>";
        }
        break;
      default:
        element.innerHTML = value;
    }
  }

  selectButtons.forEach(function(button) {
    button.addEventListener("click", function() {
      var targetId = this.getAttribute("data-signature");
      var element = doc.querySelector("#" + targetId);
      selectText(element, targetId);
    });
  });

  function selectText(element, targetId) {
    const button = document.querySelector(`[data-signature="${targetId}"]`);
    
    if (targetId === 'signature') {
        // Copy the signature as rich HTML
        const htmlContent = element.outerHTML;
        const textContent = element.innerText;

        const blobHtml = new Blob([htmlContent], { type: 'text/html' });
        const blobText = new Blob([textContent], { type: 'text/plain' });

        const clipboardItem = new ClipboardItem({
            'text/html': blobHtml,
            'text/plain': blobText
        });

        navigator.clipboard.write([clipboardItem]).then(() => {
            // Update button state to show success
            if (button) {
                const originalText = button.innerHTML;
                button.classList.add('copied');
                
                button.innerHTML = `
                    <span class="icon is-small"><i class="fas fa-check"></i></span>
                    <span>Copied!</span>
                `;
                
                setTimeout(() => {
                    button.classList.remove('copied');
                    button.innerHTML = originalText;
                }, 2000);
            }
        }).catch(err => {
            console.error('Failed to copy signature: ', err);
            alert('Failed to copy the signature. Please try again.');
        });
    } else if (targetId === 'signature_container') {
        // For code copying, get the full untruncated code
        const codePreview = document.getElementById('code_preview');
        const textToCopy = codePreview.getAttribute('data-full-code');
        
        // Use the clipboard API for text
        navigator.clipboard.writeText(textToCopy).then(() => {
            // Update button state to show success
            if (button) {
                const originalText = button.innerHTML;
                button.classList.add('copied');
                
                button.innerHTML = `
                    <span class="icon is-small"><i class="fas fa-check"></i></span>
                    <span>Copied!</span>
                `;
                
                setTimeout(() => {
                    button.classList.remove('copied');
                    button.innerHTML = originalText;
                }, 2000);
            }
        }).catch(err => {
            console.error('Failed to copy code: ', err);
            alert('Failed to copy the code. Please try again.');
        });
    }
  }

  // MODAL THINGS
  var qualsSave = doc.querySelector("#qualsSave");
  var qual1 = doc.querySelector("#qual1");
  var qual2 = doc.querySelector("#qual2");
  var award1 = doc.querySelector("#award1");
  var award2 = doc.querySelector("#award2");
  function qualsSaveButton() {
    //window.alert("Run save func");
    if (!qual1.value && !qual2.value && !award1.value && !award2.value) {
      qualsWrap.innerHTML = "";
    }
    var qualsCombined = "";
    var qualsStylised = "";
    if (qual1.value) {
      qualsCombined += qual1.value;
      qualsStylised += qual1.value;
    }
    if (award1.value) {
      if (!award2.value || (award2.value && award2.value != award1.value)) {
        qualsCombined += " " + award1.value;
        qualsStylised += " <i>" + award1.value + "</i>";
      }
    }
    if (qual2.value) {
      qualsCombined += ", " + qual2.value;
      qualsStylised += ", " + qual2.value;
    }
    if (award2.value) {
      qualsCombined += " " + award2.value;
      qualsStylised += " <i>" + award2.value + "</i>";
    }
    if (qualsCombined) {
      qualsWrap.innerHTML = ", " + qualsStylised;
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    // Functions to open and close a modal
    function openModal($el) {
      $el.classList.add("is-active");
    }

    function closeModal($el) {
      $el.classList.remove("is-active");
    }

    function closeAllModals() {
      (document.querySelectorAll(".modal") || []).forEach(($modal) => {
        closeModal($modal);
      });
    }

    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll(".js-modal-trigger") || []).forEach(
      ($trigger) => {
        const modal = $trigger.dataset.target;
        const $target = document.getElementById(modal);

        $trigger.addEventListener("click", () => {
          openModal($target);
        });
      }
    );

    // Add a click event on various child elements to close the parent modal
    (
      document.querySelectorAll(
        ".modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button"
      ) || []
    ).forEach(($close) => {
      const $target = $close.closest(".modal");

      $close.addEventListener("click", () => {
        if ($close.id == "qualsSave") {
          qualsSaveButton();
        } else if ($close.id == "qualsClear") {
          qualsWrap.innerHTML = "";
        }
        closeModal($target);
      });
    });

    // Add a keyboard event to close all modals
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeAllModals();
      }
    });
  });

  // Function to update code preview with truncated HTML
  function updateCodePreview() {
    const signatureTable = document.getElementById('signature');
    const codePreview = document.getElementById('code_preview');
    
    if (signatureTable && codePreview) {
        // Get the full HTML content
        let fullCode = signatureTable.outerHTML
            .replace(/></g, '>\n<')     // Add newlines between tags
            .replace(/\s{2,}/g, ' ')    // Remove extra spaces
            .trim();                    // Remove leading/trailing whitespace
        
        // Create truncated version for display
        let displayCode = fullCode;
        if (displayCode.length > 500) {
            // Find the last complete tag before 500 characters
            const lastTagIndex = displayCode.lastIndexOf('>', 500);
            displayCode = displayCode.substring(0, lastTagIndex + 1) + 
                         '\n<!-- ... truncated ... -->';
        }
        
        // Store full code as a data attribute
        codePreview.setAttribute('data-full-code', fullCode);
        
        // Display truncated and escaped version
        codePreview.innerHTML = displayCode
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }
  }

  // Add event listeners to all form inputs
  document.querySelectorAll('#form input, #form select').forEach(input => {
    input.addEventListener('input', updateCodePreview);
    input.addEventListener('change', updateCodePreview);
  });

  // Update code preview on checkbox changes
  document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', updateCodePreview);
  });

  // Initial code preview update
  document.addEventListener('DOMContentLoaded', () => {
    updateCodePreview();
  });

})(window);
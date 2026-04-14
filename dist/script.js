((w) => {
  var doc = w.document;
  var inputs = doc.querySelectorAll("form .input");
  var selectButtons = doc.querySelectorAll("[data-select]");

  var checkPhone = doc.querySelector("#checkPhone");
  var mobileInput = doc.querySelector("#phone");
  var mobileWrap = doc.querySelector("#mobileWrap");
  var mobileLabel = doc.querySelector("#mobileLabel");

  var checkPhone2 = doc.querySelector("#checkPhone2");
  var mobile2Input = doc.querySelector("#phone2");
  var mobile2Wrap = doc.querySelector("#mobile2Wrap");
  var mobile2Label = doc.querySelector("#mobile2Label");

  var jobtitle = doc.querySelector("#jobtitle");
  var checkJobline = doc.querySelector("#check2ndJob");
  var joblineInput = doc.querySelector("#department");
  var joblineWrap = doc.querySelector("#editJobline");
  var jobSep = doc.querySelector("#jobSep");

  var checkTeams = doc.querySelector("#checkTeams");
  var teamsWrap = doc.querySelector("#teamsWrap");

  var checkAdditional = doc.querySelector("#checkAdditional");
  var additionalInput = doc.querySelector("#additional");
  var additionalWrap = doc.querySelector("#editAdditional");

  var checkPronouns = doc.querySelector("#checkPronouns");
  var pronounsInput = doc.querySelector("#pronouns");
  var pronounsWrap = doc.querySelector("#editPronouns");

  var bannerWrap = doc.querySelector("#imageWrap");
  var bannerInput = doc.querySelector("#image");
  var numberSplit = doc.querySelector("#numberSplit");

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  // Allow only <b>, </b>, <i>, </i> (case-insensitive) through; everything else escaped.
  function allowBoldItalic(s) {
    return escapeHtml(s).replace(/&lt;(\/?)(b|i|B|I)&gt;/g, "<$1$2>");
  }

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

  checkJobline.addEventListener("change", function () {
    if (this.checked) {
      joblineInput.disabled = false;
      jobSep.innerHTML = "&nbsp;|&nbsp;";
    } else {
      joblineInput.disabled = true;
      joblineInput.value = "";
      jobSep.innerHTML = "";
      removeHtmlNodes(joblineWrap);
    }
  });

  checkPhone.addEventListener("click", function () {
    if (!this.checked) {
      mobileInput.disabled = true;
      removeHtmlNodes(mobileLabel);
      removeHtmlNodes(mobileWrap);
    } else {
      mobileInput.disabled = false;
      mobileLabel.innerHTML = "<b>Mob: </b>";
      addHtmlNodes(mobileWrap, "+64 xx xxx xxxx", "phone");
    }
    addContactSplits();
  });

  checkPhone2.addEventListener("click", function () {
    if (!this.checked) {
      mobile2Input.disabled = true;
      removeHtmlNodes(mobile2Label);
      removeHtmlNodes(mobile2Wrap);
    } else {
      mobile2Input.disabled = false;
      mobile2Label.innerHTML = "<b>&nbsp;/&nbsp;</b>";
      addHtmlNodes(mobile2Wrap, "+64 xx xxx xxxx", "phone2");
    }
    addContactSplits();
  });

  checkTeams.addEventListener("click", function () {
    removeHtmlNodes(teamsWrap);
    if (this.checked) {
      teamsWrap.innerHTML = "Book&nbsp;a&nbsp;Meeting&nbsp;With&nbsp;Me";
    }
    addContactSplits();
  });

  function addContactSplits() {
    var showNumberSplit =
      (checkPhone.checked || checkPhone2.checked) && teamsWrap.innerHTML.trim().length > 0;
    numberSplit.style.display = showNumberSplit ? "inline" : "none";
  }

  addContactSplits();

  var formatButtons = doc.querySelectorAll(".format-btn");

  function setFormatButtonsEnabled(enabled) {
    formatButtons.forEach((btn) => {
      btn.disabled = !enabled;
    });
  }

  checkAdditional.addEventListener("click", function () {
    if (!this.checked) {
      additionalInput.disabled = true;
      removeHtmlNodes(additionalWrap);
      setFormatButtonsEnabled(false);
    } else {
      additionalInput.disabled = false;
      addHtmlNodes(additionalWrap, "Hours: 9am–5pm, Mon–Fri", "additional");
      setFormatButtonsEnabled(true);
    }
  });

  formatButtons.forEach((btn) => {
    // prevent the button from stealing focus from the input
    btn.addEventListener("mousedown", (e) => {
      e.preventDefault();
    });
    btn.addEventListener("click", function () {
      if (additionalInput.disabled) return;
      var tag = this.getAttribute("data-wrap");
      var open = `<${tag}>`;
      var close = `</${tag}>`;
      var start = additionalInput.selectionStart;
      var end = additionalInput.selectionEnd;
      var value = additionalInput.value;
      var selected = value.substring(start, end) || "";
      additionalInput.value =
        value.substring(0, start) + open + selected + close + value.substring(end);
      additionalInput.focus();
      var cursor = start + open.length + selected.length;
      additionalInput.setSelectionRange(cursor, cursor);
      additionalInput.dispatchEvent(new Event("keyup", { bubbles: true }));
      additionalInput.dispatchEvent(new Event("input", { bubbles: true }));
    });
  });

  var BANNER_BASE =
    "https://raw.githubusercontent.com/Method-Recycling/method-email-signature-builder/main/dist/images/banners/";

  bannerInput.addEventListener("change", () => {
    removeHtmlNodes(bannerWrap);

    if (bannerInput.value === "None") {
      bannerWrap.style.setProperty("margin", "0px", "important");
      return;
    }

    var match = bannerInput.value.match(/^banner-(\d{2})$/);
    if (!match) return;

    var img = doc.createElement("img");
    img.src = `${BANNER_BASE}Banner${match[1]}.png`;
    img.width = 450;
    img.height = 100;
    img.alt = `Method Recycling banner ${match[1]}`;
    img.classList.add("image");
    bannerWrap.appendChild(img);
    bannerWrap.style.setProperty("margin-top", "10px", "important");
  });

  function addHtmlNodes(node, data, className) {
    var span = doc.createElement("span");
    span.classList.add(className);
    span.innerHTML = data;
    span.setAttribute(
      "style",
      "font-family: Aptos, Helvetica Neue, Arial, sans-serif; font-feature-settings: 'kern' 1, 'liga' 1;"
    );
    node.appendChild(span);
  }

  function removeHtmlNodes(node) {
    node.innerHTML = "";
  }

  function updateSignature(e) {
    var id = e.target.id;
    var value = e.target.value;
    var element = doc.querySelector(`.${id}`);

    switch (id) {
      case "email":
        if (!element) return;
        element.textContent = value;
        element.href = value ? `mailto:${value}` : "";
        break;
      case "meetingUrl":
        if (checkTeams?.checked) {
          teamsWrap.href = value || "#";
        }
        break;
      case "pronouns":
        if (!element) return;
        element.textContent = ` (${value})`;
        break;
      case "jobtitle":
        if (!element) return;
        if (value.includes("|")) {
          var titles = value.split(" | ");
          element.innerHTML = `<b>${escapeHtml(titles[0])} | </b>${escapeHtml(titles[1] || "")}`;
        } else {
          element.innerHTML = `<b>${escapeHtml(value)}</b>`;
        }
        break;
      case "additional":
        if (!element) return;
        element.innerHTML = allowBoldItalic(value);
        break;
      case "phone":
      case "phone2": {
        if (!element) return;
        element.textContent = value;
        var parentLink = element.closest("a");
        if (parentLink) parentLink.href = value ? `tel:${value.replace(/[^\d+]/g, "")}` : "";
        break;
      }
      default:
        if (!element) return;
        element.textContent = value;
    }
  }

  selectButtons.forEach((button) => {
    button.addEventListener("click", function () {
      var targetId = this.getAttribute("data-signature");
      var element = doc.querySelector(`#${targetId}`);
      selectText(element, targetId);
    });
  });

  function selectText(element, targetId) {
    var button = doc.querySelector(`[data-signature="${targetId}"]`);

    function onCopied() {
      if (!button) return;
      var originalText = button.innerHTML;
      button.classList.add("copied");
      button.innerHTML =
        '<span class="icon is-small"><i class="fas fa-check"></i></span><span>Copied!</span>';
      setTimeout(() => {
        button.classList.remove("copied");
        button.innerHTML = originalText;
      }, 2000);
    }

    if (targetId === "signature") {
      var htmlContent = element.outerHTML;
      var textContent = element.innerText;
      var clipboardItem = new ClipboardItem({
        "text/html": new Blob([htmlContent], { type: "text/html" }),
        "text/plain": new Blob([textContent], { type: "text/plain" }),
      });
      navigator.clipboard.write([clipboardItem]).then(onCopied, (err) => {
        console.error("Failed to copy signature: ", err);
        alert("Failed to copy the signature. Please try again.");
      });
      return;
    }

    if (targetId === "signature_container") {
      var codePreview = doc.getElementById("code_preview");
      var textToCopy = codePreview.getAttribute("data-full-code") || "";
      navigator.clipboard.writeText(textToCopy).then(onCopied, (err) => {
        console.error("Failed to copy code: ", err);
        alert("Failed to copy the code. Please try again.");
      });
    }
  }

  function updateCodePreview() {
    var signatureTable = doc.getElementById("signature");
    var codePreview = doc.getElementById("code_preview");
    if (!signatureTable || !codePreview) return;

    var fullCode = signatureTable.outerHTML
      .replace(/></g, ">\n<")
      .replace(/\s{2,}/g, " ")
      .trim();

    var displayCode = fullCode;
    if (displayCode.length > 500) {
      var lastTagIndex = displayCode.lastIndexOf(">", 500);
      displayCode = `${displayCode.substring(0, lastTagIndex + 1)}\n<!-- ... truncated ... -->`;
    }

    codePreview.setAttribute("data-full-code", fullCode);
    codePreview.textContent = displayCode;
  }

  doc.querySelectorAll("#form input, #form select").forEach((el) => {
    el.addEventListener("input", updateCodePreview);
    el.addEventListener("change", updateCodePreview);
  });

  doc.querySelectorAll('input[type="checkbox"]').forEach((el) => {
    el.addEventListener("change", updateCodePreview);
  });

  var meetingUrlInput = doc.getElementById("meetingUrl");
  if (meetingUrlInput) {
    meetingUrlInput.addEventListener("input", (e) => {
      updateSignature(e);
      updateCodePreview();
    });
  }

  doc.addEventListener("DOMContentLoaded", () => {
    if (checkTeams && !checkTeams.checked) {
      teamsWrap.innerHTML = "";
    }
    addContactSplits();
    bannerInput.dispatchEvent(new Event("change"));
    updateCodePreview();
  });
})(window);

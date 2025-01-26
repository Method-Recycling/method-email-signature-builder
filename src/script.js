(function (w) {
  var doc = w.document;
  var inputs = doc.querySelectorAll("form .input");
  var select = doc.querySelector("[data-select]");
  var prepare = doc.querySelector("[data-prepare]");
  var download = doc.querySelector("[data-load]");

  var tableSignature = doc.querySelector("#signature > tbody");

  var checkPhone = doc.querySelector("#checkPhone");
  var mobileInput = doc.querySelector("#phone");
  var mobileWrap = doc.querySelector("#mobileWrap");

  var mobileLabel = doc.querySelector("#mobileLabel");
  var checkDDI = doc.querySelector("#checkDDI");
  var ddiInput = doc.querySelector("#ddi");
  var ddiWrap = doc.querySelector("#ddiWrap");
  var ddiLabel = doc.querySelector("#ddiLabel");

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

  /*var checkQuals = doc.querySelector("#checkQuals");
  var qualsInput = doc.querySelector("#quals");*/
  var qualsWrap = doc.querySelector("#editQuals");
  var checkIwi = doc.querySelector("#checkIwi");
  var iwiInput = doc.querySelector("#iwi");
  var iwiWrap = doc.querySelector("#editIwi");

  var checkPronouns = doc.querySelector("#checkPronouns");
  var pronounsInput = doc.querySelector("#pronouns");
  var pronounsWrap = doc.querySelector("#editPronouns");

  var checkICT = doc.querySelector("#checkICT");
  var editServiceNow = doc.querySelector("#editServiceNow");
  var snRow = doc.querySelector(".row-servicenow");

  var bannerWrap = doc.querySelector("#imageWrap");
  var bannerInput = doc.querySelector("#image");

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

  checkIwi.addEventListener("click", function () {
    if (!checkIwi.checked) {
      iwiInput.disabled = true;
      removeHtmlNodes(iwiWrap);
    } else {
      iwiInput.disabled = false;
      addHtmlAndBreak(iwiWrap, "Iwi/hapu", "iwi");
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

  checkDDI.addEventListener("click", function () {
    if (!this.checked) {
      ddiInput.disabled = true;
      removeHtmlNodes(ddiWrap);
      removeHtmlNodes(ddiLabel);
      addContactSplits();
    } else {
      ddiInput.disabled = false;
      ddiLabel.innerHTML = "<b>DDI: </b>";
      addHtmlNodes(ddiWrap, "+64 xx xxx xxxx", "ddi");
      addContactSplits();
    }
  });

  checkTeams.addEventListener("click", function () {
    if (!this.checked) {
      removeHtmlNodes(teamsWrap);
      addContactSplits();
    } else {
      teamsWrap.innerHTML = "Call&nbsp;me&nbsp;on&nbsp;Teams";
      addContactSplits();
    }
  });

  function addContactSplits() {
    var numberSplit = doc.querySelector("#numberSplit");
    var teamsSplit = doc.querySelector("#teamsSplit");

    numberSplit.innerHTML =
      checkPhone.checked && checkDDI.checked ? " &nbsp;|&nbsp; " : "";
    teamsSplit.innerHTML =
      checkTeams.checked && (checkPhone.checked || checkDDI.checked)
        ? " &nbsp;|&nbsp; "
        : "";
  }

  checkAdditional.addEventListener("click", function () {
    if (!this.checked) {
      additionalInput.disabled = true;
      removeHtmlNodes(additionalWrap);
    } else {
      additionalInput.disabled = false;
      addHtmlNodes(
        additionalWrap,
        "Hours: 9am–5pm, Mon–Fri",
        "additional"
      );
    }
  });

  checkICT.addEventListener("click", function () {
    if (!this.checked) {
      removeHtmlNodes(snRow);
    } else {
      createSN();
    }
  });

  bannerInput.addEventListener("change", function () {
    removeHtmlNodes(bannerWrap);
    var img = doc.createElement("img");
    var link = doc.createElement("a");
    img.width = "450";
    img.height = "100";
    link.href = "https://www.whitireiaweltec.ac.nz";

    switch (bannerInput.value) {
      case "tri1-2024":
        img.src =
          "https://www.whitireiaweltec.ac.nz/assets/Events/E_MERGE_EmailSig_450x170px_2024.jpg?vid=5";
        break;

      case "tri2-2024":
        img.src =
          "https://www.whitireiaweltec.ac.nz/assets/Events/E_MERGE_EmailSig_450x170px_2024.jpg?vid=5";
        break;

      case "od_2024":
        img.src =
          "https://www.whitireiaweltec.ac.nz/assets/Events/E_MERGE_EmailSig_450x170px_2024.jpg?vid=5";
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

      case "tri1-25":
        img.src =
          "https://www.whitireiaweltec.ac.nz/assets/Events/E_MERGE_EmailSig_450x170px_2025.jpg";
        break;

      default:
        img.src = "";
        img.width = "1";
        img.height = "1";
        link.href = "#";
    }

    if (bannerInput.value === "None") { // Corrected case
      removeHtmlNodes(bannerWrap);
      bannerWrap.style.setProperty("margin", "0px", "important");
    } else {
      if (img.src) { // Ensure img.src is not empty
        img.classList.add("image");
        link.appendChild(img);
        bannerWrap.appendChild(link);
        bannerWrap.style.setProperty("margin-top", "10px", "important");
      }
    }
  });

  function removeBanner() {
    removeHtmlNodes(bannerWrap);
  }

  function createSN() {
    var row = doc.querySelector(".row-servicenow");
    var cell = doc.createElement("td");
    cell.id = "editServiceNow";
    cell.setAttribute(
      "style",
      "font-family: Aptos, Helvetica Neue, Arial, sans-serif; font-size: 10pt; font-feature-settings: 'kern' 1, 'liga' 1; vertical-align: top; padding: 0px 0px 18px 0px;"
    );
    var span = doc.createElement("span");
    span.setAttribute(
      "style",
      "font-family: Aptos, Helvetica Neue, Arial, sans-serif; font-size: 10pt; font-feature-settings: 'kern' 1, 'liga' 1; background-color: #DEDEDE; padding: 6px;"
    );
    var link = doc.createElement("a");
    link.innerHTML = "<b>w2ss.service-now.com</b>";
    link.setAttribute(
      "style",
      "text-decoration-line: underline; color: #000000; text-decoration-color: #000000;"
    );
    link.setAttribute("href", "https://w2ss.service-now.com");
    span.innerHTML =
      "<b>ICT Service Centre</b>&ensp;|&ensp;<b>Ph: </b>+64 4 830 3150&ensp;|&ensp;";
    span.appendChild(link);
    cell.appendChild(span);
    row.appendChild(cell);
  }

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
      case "jobtitle":
        if (value.includes("|")) {
          const titles = value.split(" | ");
          element.innerHTML = "<b>" + titles[0] + " | </b>" + titles[1];
        } else {
          element.innerHTML = "<b>" + value + "</b>";
        }
        break;
      // Add more cases as needed
      default:
        element.innerHTML = value;
    }
  }

  select.addEventListener("click", function () {
    selectText(doc.querySelector("#signature_container"));
  });

  // from SO: http://stackoverflow.com/a/987376/1592915
  function selectText(element) {
    if (doc.body.createTextRange) {
      range = doc.body.createTextRange();
      range.moveToElementText(element);
      range.select();
      document.execCommand("copy");
      alert("Copied to clipboard");
    } else if (w.getSelection) {
      selection = w.getSelection();
      range = doc.createRange();
      range.selectNodeContents(element);
      selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand("copy");
      alert("Copied to clipboard");
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
        const $target = doc.getElementById(modal);

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
})(window);

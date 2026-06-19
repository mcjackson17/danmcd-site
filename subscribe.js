(function () {
  var forms = document.querySelectorAll('.optin-form');

  forms.forEach(function (form) {
    var email = form.querySelector('input[name="email"]');
    var button = form.querySelector('button[type="submit"]');
    var status = form.parentElement.querySelector('.optin-status');

    form.addEventListener('submit', async function (event) {
      event.preventDefault();
      if (!email.reportValidity()) return;

      button.disabled = true;
      button.textContent = 'Subscribing…';
      status.textContent = '';
      status.className = 'optin-status';

      try {
        var result = await fetch('/api/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email.value,
            website: form.elements.website.value,
          }),
        });
        var data = await result.json();

        if (!result.ok) throw new Error(data.error || 'Unable to subscribe right now.');

        email.value = '';
        status.textContent = 'You’re in. Check your inbox for a welcome email.';
        status.className = 'optin-status is-success';
      } catch (error) {
        status.textContent = error.message || 'Unable to subscribe right now.';
        status.className = 'optin-status is-error';
      } finally {
        button.disabled = false;
        button.textContent = 'Subscribe';
      }
    });
  });
})();

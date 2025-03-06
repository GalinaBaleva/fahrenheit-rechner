const form = document.forms.celsius;

form.addEventListener('submit', onSubmit);

const url = 'http://localhost:3000'


async function onSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const from = Object.fromEntries(data);

    const headers = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({"F": from.from})
    }

    const response = await fetch(`${url}/celsius`, headers);
    const dataFromServer = await response.json();

    const output = form.elements["to"];

    // const divElement = e.target.querySelector('.to');
    output.value = `${from.from}℉ ➜ ${dataFromServer.C}℃`;
}
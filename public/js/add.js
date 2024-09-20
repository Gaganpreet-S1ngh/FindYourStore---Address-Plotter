const storeForm = document.getElementById("add-store-form");
const storeId = document.getElementById('storeId');
const address = document.getElementById('storeAddress');



//send post to API
async function addStore(e) {
    e.preventDefault();
    if (storeId.value === '' || address.value === '') {
        alert("Please fill in the fields!");
    }

    const sendBody = {
        storeId: storeId.value,
        address: address.value
    }

    try {
        const res = await fetch("http://localhost:5001/stores/addStore", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(sendBody)
        })


        if (res.status === 400) {
            throw Error("Store already Exists!");
        }

        alert("Store Added!");

        window.location.href = '/index.html';
    } catch (error) {
        alert(error);
        return;
    }
}

storeForm.addEventListener("submit", addStore)
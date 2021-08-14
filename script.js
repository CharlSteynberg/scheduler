
    function getMemory( item )
    {
        let memory = localStorage.getItem("memory");

        if (!memory)
        {
            memory = {};
        }
        else
        {
            memory = JSON.parse( atob(memory) );
        };

        return ( item ? memory[item] : memory );
    };



    function refresh( filter )
    {
        let viewCell = document.getElementById("viewCell");
        viewCell.innerHTML = "";
        let memory = getMemory();

        Object.keys(memory).forEach((item)=>
        {
            if (!!filter && !item.startsWith(filter)){ return };
            let card = document.createElement("card");
            card.innerHTML = item;
            viewCell.appendChild(card);
        });
    };




    document.getElementById("cardButn").addEventListener("click", function()
    {
        let cardName = document.getElementById("cardName");
        let nameText = cardName.value.trim();

        if (nameText < 2)
        {
            alert("nope...");
            return;
        };

        let memory = getMemory();

        if ((typeof memory[ nameText ]) == "undefined")
        {
            memory[ nameText ] = "";
            memory = btoa( JSON.stringify(memory) );
            localStorage.setItem("memory", memory);
            cardName.value = "";
            refresh();
            return;
        };

        refresh( nameText );
    });



    refresh();

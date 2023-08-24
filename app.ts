const inputConfig = await Deno.readTextFile('./input/test.conf');



const serverStatus = await Deno.readTextFile('./input/serverStatus.txt')
// selects S08 in "[ S08 ] ( 🟠 ) [ PSD ]"
const serverNameRegex = /S\d+\w+/ig;
const availableServers = serverStatus.matchAll(serverNameRegex); 

async function makeConfigFiles(servers: IterableIterator<RegExpMatchArray>) {

    servers.next().value;
    
    
    for (let sv of servers) {
        // Replace S08 with S8
        const newSV = sv.toString().replace(/S0(\d)/i, "S$1");
        
        const newConfigText = inputConfig.replace(/= s\d+/i, `= ${newSV}`);
        await Deno.writeTextFile(`./output/${sv}.conf`, newConfigText);
        console.log(`wrote ${sv} config file`);
    }
}


makeConfigFiles(availableServers)
.then(() => console.log("DONE"))
.catch((err) => console.error("Failed", err))




import {teams} from './teams.js';

import fs from 'fs';
   
function readTeam(id) {
    const data = fs.readFileSync(`./squad/${id}.json`);
    return JSON.parse(data);
}

const allPlayers = [];

teams.map((team)=>{
    const players = readTeam(team.id);

    players.map(player=>{
        allPlayers.push( {...player, name: player.name.trim(), team: team.id});
    });

})

console.log(JSON.stringify(allPlayers));

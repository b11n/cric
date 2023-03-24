import {matches} from './matches.js';
import {teams} from './teams.js';


let newMatches = matches.map((match)=>{
    const {away, home} = match;
    const awayCode = teams.find((team)=>{
        return team.name === away;
    }).id;

    const homeCode = teams.find((team)=>{
        return team.name === home;
    }).id;

    return {...match, awayCode, homeCode}

});

console.log(newMatches)


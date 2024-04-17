class Team {
  constructor (name) {
    this.name = name;
    this.mp = 0;
    this.w = 0;
    this.d = 0;
    this.l = 0;
    this.p = 0;
  }

  updateStats(game) {
    const result1 = game[0];
    const result2 = game[1];
    const outcome = game[2];
    this.mp++;
    if ((result1 === this.name && outcome === 'win') || (result2 === this.name && outcome === 'loss')) {
      this.w++;
      this.p += 3;
    } else if ((result1 !== this.name && outcome === 'win') || (result1 === this.name && outcome === 'loss')) {
      this.l++;
    } else {
      this.d++;
      this.p++;
    }
  }
}

const header = 'Team                           | MP |  W |  D |  L |  P';

export const tournamentTally = (results) => {
  if (results === '') return header; // Just return the header if there are no results.
  // split and format matches
  let splitResults = results.split('\n'); // split the newlines
  const matches = []; // create array to hold matches
  splitResults.forEach(result => matches.push(result.split(';'))); // split the matches on semicolon

  // create teams and iterate through. matches
  let teams = [];
  for (let match of matches) {
    if (teams.find(team => team.name === match[0]) === undefined) { // check if team1 has already been added
      teams.push(new Team(match[0]));
    }
    if (teams.find(team => team.name === match[1]) === undefined) { // check if team2 has already been added
      teams.push(new Team(match[1]));
    }

    // find the teams in list and update their stats
    let result1 = teams.find((team) => team.name === match[0]);
    let result2 = teams.find((team) => team.name === match[1]);
    result1.updateStats(match);
    result2.updateStats(match);
  }
  
  // sort the list by points
  teams.sort((a, b) => {
    if (a.p > b.p) {
      return -1;
    } else if (a.p < b.p) {
      return 1;
    } else {
      return a.name > b.name ? 1 : -1;
    }
  });

  // format the table & return it
  const createTable = (teamsArray) => {
    let formattedTable = [];
    for (let team of teamsArray) {
      let formattedName = team.name.padEnd(31, " ");
      let formattedStatsArray = [team.mp.toString(), team.w.toString(), team.d.toString(), team.l.toString(), team.p.toString()];
      formattedStatsArray = formattedStatsArray.map((stat) => {
        stat = stat.padStart(3);
        return stat.padEnd(4);
      })
      formattedStatsArray[4] = formattedStatsArray[4].trimEnd();
      formattedStatsArray.unshift(formattedName);
      formattedStatsArray = formattedStatsArray.join('|');
      formattedTable.push(formattedStatsArray);
    }
    formattedTable.unshift(header);
    formattedTable = formattedTable.join("\n")
    return formattedTable;
  }
  
  return createTable(teams);
};
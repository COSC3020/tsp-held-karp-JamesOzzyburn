function tsp_hk(distance_matrix) {
    //cache for memoization
    let cache = [];

    //Make our list of cities we have not visited so far
    let cities = [];
    for(let i = 0; i < distance_matrix.length; i++) {
        cities.push(i);
    }

    //bestPath is the eventual best path we get by comparing all of the different paths
    let bestPath = Infinity;
    for(let i = 0; i < cities.length; i++) {
        let newPath = heldKarp(i, [...cities]);
        if(newPath < bestPath) {
            bestPath = newPath;
        }
    }
    return bestPath;

    function heldKarp(start, cities) {
        //Make a key for our cache and then check if its in the cache if it is return if not continue
        let key = JSON.stringify([start, cities]);
        if(cache[key] != undefined) {
            return cache[key];
        }
    
        //If cities length is less than 2 there is not path so return 0
        if (cities.length < 2) {
            return 0;
        }
        //If cities length is 2 add to the cache and return the path (lines 3-4 in the pseudocode)
        else if (cities.length == 2) {
            cache[key] = distance_matrix[cities[0]][cities[1]];
            return distance_matrix[cities[0]][cities[1]];
        }

        else {
            //minPath is the eventual minimum path we get by comparing all of the different paths
            let minPath = Infinity;

            //Make a new list of cities with everything but the start
            cities.splice(cities.indexOf(start), 1);

            //Line 7 in the pseudocode
            for(let i = 0; i < cities.length; i++) {
                let newPath = heldKarp(cities[i], [...cities]) + distance_matrix[start][cities[i]]; //line 9 of the psuedocode
                //Check if the newPath is shorter
                if (newPath < minPath) {
                    minPath = newPath;
                }
            }
            //Add to the cache and return our new path
            cache[key] = minPath;
            return minPath;
        }
    }
}
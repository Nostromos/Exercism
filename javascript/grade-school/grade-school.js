  /**
   *  Code that you can read and reason about is more important than line count!
   *  I strive to keep all my solutions simple, efficient, and straightforward.
   *  I don't always succeed but I do my best and feedback is welcome.
   * 
   *  For more of my solutions, check out my profile: https://exercism.org/profiles/Nostromos
   */

export class GradeSchool {
  constructor() {
    this.students = {}; // Ensure we have an empty array to return.
  }
  
  roster() {
    /**
     * We want to 'deep copy' the roster of students 
     * and return it instead of returning a reference to it.
     * This prevents someone from directly changing the
     * original, per a couple of the tests.
     */
    const rosterCopy = JSON.parse(JSON.stringify(this.students));
    return rosterCopy;
  }

  add(name, grade) {
    // We check for duplicates...
    for (let [key, value] of Object.entries(this.students)) {
      if (value.includes(name)) { // If we find one, we delete it.
        this.students[key].splice(this.students[key].indexOf(name), 1);
      }
    }
    // Then we check if the grade exists.
    if (!this.students[grade]) {
      this.students[grade] = [name]; // If it doesn't, we push the student's name and instantiate the grade. Since this is the first & only student, we don't need to sort it.
    } else {
      this.students[grade].push(name); // If the grade does exist, we just add the name...
      this.students[grade].sort(); // And sort it!
    }
  }

  grade(n) {
    if (!this.students[n]) {
      return new Array(); // If there is no grade, we just send a new empty array.
    } else {
      const rosterCopy = JSON.parse(JSON.stringify(this.students)); // Otherwise we (again) deep copy it and...
      return rosterCopy[n]; // Return the right grade.
    }
  }
}

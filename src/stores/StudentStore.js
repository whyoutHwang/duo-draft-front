import { makeAutoObservable } from "mobx";

class StudentStore {
  hasStudents = false;
  students = [];

  constructor() {
    makeAutoObservable(this);
  }

  setHasStudents(value) {
    this.hasStudents = value;
  }

  setStudents(students) {
    this.students = students;
    this.hasStudents = students.length > 0;
  }

  refreshStudents(newStudents) {
    this.setStudents(newStudents);
  }
}

export default new StudentStore();

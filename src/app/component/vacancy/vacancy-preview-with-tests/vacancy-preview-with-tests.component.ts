import {Component, Input, OnInit} from '@angular/core';
import {ButtonAcceptBigComponent} from "../../button/button-accept-big/button-accept-big.component";
import {ButtonAcceptGreenComponent} from "../../button/button-accept-green/button-accept-green.component";
import {Router} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import {UserService} from "../../../../service/user/user.service";

@Component({
  selector: 'app-vacancy-preview-with-tests',
  standalone: true,
  imports: [
    ButtonAcceptBigComponent,
    ButtonAcceptGreenComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './vacancy-preview-with-tests.component.html',
  styleUrl: './vacancy-preview-with-tests.component.css'
})
export class VacancyPreviewWithTestsComponent implements OnInit {

  @Input() vacancy: any
  vacancyObject: any

  @Input() testPassed: any
  testPassedArray: any

  constructor(private router: Router,
              private userService: UserService) {

  }

  navigateToTest(testId: any, vacancyId: any) {

    this.router.navigate(['test/' + vacancyId + "/" + testId])
  }

  navigateToVacancy() {
    this.router.navigate(['vacancy/' + this.vacancyObject.id])
  }

  ngOnInit(): void {

    this.init()

  }

  init() {
    let obj = this;
    let vacancy = JSON.parse(obj.vacancy);
    let testPassed = JSON.parse(obj.testPassed)

    obj.testPassed = testPassed;
    obj.testPassedArray = obj.getTestPassed(vacancy)
    obj.vacancyObject = vacancy
  }

  countTestWithoutPassed(): any {
    if (this.vacancyObject == null || this.testPassedArray == null) return null;
    let count = 0;
    for (let test of this.vacancyObject.testDtos) {
      if (this.testPassedArray.indexOf(test.id) == -1) {
        count++;
      }
    }
    return count;
  }

  testNotPassed(test: any): any {
    return this.testPassedArray.indexOf(test.id) == -1
  }

  getTestPassed(vacancy: any): any {
    if (this.testPassed == null) return null;

    let data: any = []
    for (let test of this.testPassed) {
      if (test.vacancy == vacancy.id) {
        for (let testPassed of test.testPassed) {
          for (let testVacancy of vacancy.testDtos) {
            if (testPassed == testVacancy.id)
              data.push(testPassed)
          }
        }
        return data;
      }
    }

    return data;
  }


  getTestPassedCheck(testVacancy: any): any {
    return false;
  }
}

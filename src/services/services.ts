import { Component, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { HTTP } from '@ionic-native/http/ngx';

const nativeHeaders = {
    'Content-Type': 'application/x-www-form-urlencoded',
};

@Injectable({
    providedIn: 'root'
})
export class Services {
    loading: any;
    lang = 'ar';//ar

    ar: boolean = false;
    user_id: any;
    CountCart: any = 0;

    /* yousef auth var */
    authenticationState = new BehaviorSubject(false);

    apiUrl: any = 'http://taqwiaa.com/api/';
    image_url: any = 'http://taqwiaa.com/upload/';

    isIPad = false;

    constructor(
        public httpClient: HttpClient,
        public storage: Storage,
        private plt: Platform,
        public translate: TranslateService,
        private nativeHttp: HTTP
    ) {
        this.plt.ready().then(() => {
            this.checkToken();
        });

        this.isIPad = plt.is('ipad')
    }

    check_lang() {
        this.storage.get('lang').then(value => {
            if (value) {
                this.lang = value
            }
            this.translate.use(this.lang);
        });
    }

    /* m7mood - start :: old service way */
    check_userid() {
        this.storage.get('user_info').then(value => {
            if (value) {
                this.user_id = JSON.parse(value).id;
            } else {
                this.user_id = false;
            }
        });
    }

    authentication(data) {
        if (data == 2) {
            return false;
        }
        return true;
    }
    /* m7mood - end :: old service way */

    /* yousef start :: auth*/
    checkToken() {
        this.storage.get('auth-token').then(res => {
            if (res) {
                this.authenticationState.next(true);
            }
        });
    }

    login(data) {
        return this.storage.set('auth-token', data).then(() => {
            this.authenticationState.next(true);
        });
    }

    logout() {
        return this.storage.remove('auth-token').then(() => {
            this.authenticationState.next(false);
        });
    }

    isAuthenticated() {
        return this.authenticationState.value;
    }
    /* yousef end :: auth*/

    getCategorySubject() {        
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        };
        return this.httpClient.get(this.apiUrl + 'getCategorySubject', httpOptions);
    }

    getSubject(): Observable<any> {
        return this.httpClient.get(this.apiUrl + 'subject');
    }

    getRelation(): Observable<any> {
        return this.httpClient.get(this.apiUrl + 'relation');
    }

    getGrade(): Observable<any> {
        return this.httpClient.get(this.apiUrl + 'grade');
    }

    getEducation(): Observable<any> {
        return this.httpClient.get(this.apiUrl + 'education');
    }

    getCountry(): Observable<any> {
        return this.httpClient.get(this.apiUrl + 'country');
    }

    makeLogin(data): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        };
        let body = 'email=' + data.email + '&password=' + data.password;
        return this.httpClient.post(this.apiUrl + 'login', body, httpOptions);
    }

    makeRegister(data): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        };
        let body = 'name=' + data.name +
            '&email=' + data.email +
            '&password=' + data.password +
            '&password_confirmation=' + data.password_confirmation +
            '&phone=' + data.phone +
            '&country_id=' + data.country_id +
            '&nationality_id=' + data.nationality_id +
            '&subject_id=' + data.subject_id +
            '&accountType=' + data.accountType;

        return this.httpClient.post(this.apiUrl + 'register', body, httpOptions);
    }

    makeEdit(data): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        };
        console.log(data);
        let body = 'name=' + data.name +
            '&phone=' + data.phone +
            '&education_level_id=' + data.education_level_id +
            '&grade_id=' + data.grade_id +
            '&school_area=' + data.school_area +
            '&school_name=' + data.school_name +
            '&relation_id=' + data.relation_id +
            '&image=' + data.personalImage +
            '&id=' + data.id;
        return this.httpClient.post(this.apiUrl + 'edit', body, httpOptions);
    }

    makeContact(data): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        };
        let body = 'name=' + data.name +
            '&email=' + data.email +
            '&subject=' + data.subject +
            '&message=' + data.message;
        return this.httpClient.post(this.apiUrl + 'contact', body, httpOptions);
    }

    getSlider(): Observable<any> {
        console.log('gggggg');
        return this.httpClient.get(this.apiUrl + 'slider');
    }

    getUserData(userId): Observable<any> {
        return this.httpClient.get(this.apiUrl + 'user/' + userId);
    }

    getSetting(): Observable<any> {
        return this.httpClient.get(this.apiUrl + 'setting');
    }

    getPackages(): Observable<any> {
        return this.httpClient.get(this.apiUrl + 'package');
    }

    getTeachers(): Observable<any> {
        return this.httpClient.get(this.apiUrl + 'teacher');
    }

    getTeachersOfSubject(subjectId): Observable<any> {
        return this.httpClient.get(this.apiUrl + 'teacher/' + subjectId);
    }

    teacherInfo(userId): Observable<any> {
        return this.httpClient.get(this.apiUrl + 'teacher/' + userId + '/show');
    }

    getReviews(teachertId): Observable<any> {
        return this.httpClient.get(this.apiUrl + 'getReviews/' + teachertId);
    }

    getTeacherSubject(userId, subjectId): Observable<any> {
        return this.httpClient.get(this.apiUrl + 'teacher_subject/' + userId + '/' + subjectId);
    }

    buy(data): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        };
        let body = 'userId=' + data.userId +
            '&pakageId=' + data.pakageId;
        return this.httpClient.post(this.apiUrl + 'buy', body, httpOptions);
    }

    makeBook(data): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        };
        let body = 'date=' + data.date +
            '&selectedHour=' + data.selectedHour +
            '&time=' + data.time +
            '&duration=' + data.duration +
            '&location=' + data.location +
            '&subjectId=' + data.subjectId +
            '&teacherId=' + data.teacherId +
            '&price=' + data.price +
            '&userId=' + data.userId;
        return this.httpClient.post(this.apiUrl + 'book', body, httpOptions);
    }

    review(data): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        };
        let body = 'user_id=' + data.user_id +
            '&title=' + data.rtitle +
            '&description=' + data.rtext +
            '&rank=' + data.rank +
            '&teacher_id=' + data.teacher_id;
        return this.httpClient.post(this.apiUrl + 'review', body, httpOptions);
    }


}


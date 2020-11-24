import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationService {

    private sessionName = 'bn2vd7_28y3d3_dub82';

    public sessionCheck(): boolean {
        return true;
    }

    public sessionClose(): void {}

    public sessionOpen(): void {}

}

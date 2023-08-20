import { Time } from "@angular/common";

export class UserPosts {
    id!: number;
    postedon!: Date;
    publishondate! :Date ;
    publishontime! :Time ;
    posttype! :string ;
    postcontexttext! :string ;
    postattachmenturl! :string ;
    poststatus! :string ;
    userName! :string ;
    socialnetworktype! :string ;
    isScheduled! :number;
}

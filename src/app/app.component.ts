import { Component, OnInit } from '@angular/core';
import { SharedService } from "../shared/services/shared.service";
import { forkJoin, take } from "rxjs";
import { User } from "../shared/models/user.model";
import { File } from "../shared/models/file.model";
import { Type } from "../shared/models/type.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  users: User[] = [];
  types: Type[] = [];
  files: File[] = [];
  copyOfFiles: File[] = [];

  preselectedType = 'Please select Type';

  constructor(private sharedService: SharedService) { }

  ngOnInit() {
    forkJoin([this.sharedService.getUsers(), this.sharedService.getFiles(), this.sharedService.getTypes()])
      .pipe(take(1))
      .subscribe(res => {
        this.users = res[0];
        this.files = res[1];

        // Create None options for dropdown
        const noneOption: Type = {
          colourId: "golden",
          creationDateTime: "2016-08-17T13:07:19.800Z",
          description: "Articles about the programme",
          documentsCount: 5,
          id: "none",
          name: "Article Page",
        };
        this.types.push(noneOption, ...res[2]);

        this.addContributorToFiles();
      })
  }

  public onSearch(event: any) {
    const searchedTitle = event.target.value.toLowerCase();
    this.files = this.copyOfFiles;
    this.files = this.files.filter((file: File) => file.title
       .toLocaleLowerCase()
       .includes(searchedTitle)
    );
  }

  public selectedDropdownBtnType(type: string) {
    this.preselectedType = type;

    this.files = this.copyOfFiles;

    if (type !== 'none') {
      this.files = this.files.filter((file: File) => file.type === type);
    } else {
      this.files = this.copyOfFiles;
    }
  }


  public getStatusColor(status: string) {
    switch (status) {
      case 'Published':
        return 'cadetblue';
      case 'Approved':
        return 'yellowgreen';
      case 'For review':
        return 'green';
      default:
        return 'red';
    }
  }

  private addContributorToFiles() {
    this.files = this.files.map((file: File) => ({ ...file,
      createdByUser: this.users.find((user: User) => user.id === file.createdBy),
      modifiedByUser: this.users.find((user: User) => user.id === file.modifiedBy)
    }));

    this.copyOfFiles = this.files;
  }
}

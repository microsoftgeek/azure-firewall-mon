import { Component, OnInit } from '@angular/core';

import { ModelService } from '../services/model.service';
import { DemoSourceService } from '../services/demo-source.service';
import { EventHubSourceService } from '../services/event-hub-source.service';

import { TableVirtualScrollDataSource } from 'ng-table-virtual-scroll';

export interface FirewallRow {
  time: string;
  protocol: string;
  sourceip: string;
  srcport: string;
  targetip: string;
  targetport: string;
  action: string;
};

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  
  protocolsArray: Array<string> = ["TCP", "UDP"];
  actionsArray: Array<string> = ["ACCEPT", "DROP"];
  portsArray: Array<string> = ["80", "443", "8080", "8443","22","21","23","25","53","110","143","389","443","445","993","995","1723","3306","3389","5900","8080","8443"];

  constructor(
    private model: ModelService,
    private demoSource: DemoSourceService,
    private eventHubService: EventHubSourceService
    ) {
      for (let i = 0; i < 100000; i++) {

        var row = {
          time: new Date().toLocaleString(),
          protocol: this.protocolsArray[Math.floor(Math.random() * this.protocolsArray.length)],
          sourceip: (Math.floor(Math.random() * 255) + 1)+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255)),
          srcport: this.portsArray[Math.floor(Math.random() * this.portsArray.length)],
          targetip: (Math.floor(Math.random() * 255) + 1)+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255)),
          targetport: this.portsArray[Math.floor(Math.random() * this.portsArray.length)],
          action: this.actionsArray[Math.floor(Math.random() * this.actionsArray.length)]
        } as FirewallRow;

        
        this.DATA.push(row);
    };
  }
 
  DATA: Array<FirewallRow> = [];
  displayedColumns = ['time', 'protocol','sourceip', 'srcport','targetip', 'targetport', 'action'];
  dataSource = new TableVirtualScrollDataSource(this.DATA);

  ngOnInit(): void {
    
    setInterval(() => {
      
      var row = {
        time: new Date().toLocaleString(),
          protocol: this.protocolsArray[Math.floor(Math.random() * this.protocolsArray.length)],
          sourceip: (Math.floor(Math.random() * 255) + 1)+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255)),
          srcport: this.portsArray[Math.floor(Math.random() * this.portsArray.length)],
          targetip: (Math.floor(Math.random() * 255) + 1)+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255)),
          targetport: this.portsArray[Math.floor(Math.random() * this.portsArray.length)],
          action: this.actionsArray[Math.floor(Math.random() * this.actionsArray.length)]
      } as FirewallRow;

      this.DATA.unshift(row);
      this.dataSource = new TableVirtualScrollDataSource(this.DATA);

      console.log("heartbit!"); // just testing if it is working
    }, 1000);
  }

}

import { Injectable } from '@angular/core';

interface Novel {
  novelName: string;
  penName: string;
  group: string;
  type: string;
  mainGroups: string;
  selectedSubCategory1: string;
  selectedSubCategory2: string;
  tag: string;
  rate: string;
  desc: string;
  novel_propic: File | null;
  userId: any;
}

@Injectable({
  providedIn: 'root'
})
export class NovelService {

  private novelCreate = {
    group: '',
    type: '',
  };

  private novelData: Novel = {
    novelName: '',
    penName: '',
    group: '',
    type: '',
    mainGroups: '',
    selectedSubCategory1: '',
    selectedSubCategory2: '',
    tag: '',
    rate: '',
    desc: '',
    novel_propic: null,
    userId: '',
  };

  
 

  constructor() {}

  setNovelCreate(data: { group: string; type: string }): void {
    this.novelCreate = data;
  }

  getNovelCreate(): { group: string; type: string } {
    return this.novelCreate;
  }

  typeMapping(): { [key: string]: string } {
    return {
      describe: 'บรรยาย',
      chat: 'แชท',
      cartoon: 'การ์ตูน/ภาพประกอบ',
      gist: 'กระทู้',
      fic_describe: 'ฟิคบรรยาย',
      fic_chat: 'ฟิคแชท',
      fic_doujinshi: 'โดจินชิ/แฟนอาร์ต',
    };
  }

   // Set novel data
   setNovelData(novel: Novel): void {
    this.novelData = { ...novel };
  }

  // Get novel data
  getNovelData(): Novel {
    return this.novelData;
  }


}

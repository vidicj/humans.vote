import { Component } from '@angular/core';

import { WalletUtilsProvider } from '../../providers/wallet-utils/wallet-utils';
import { ProposalsPage } from '../proposals/proposals';
import { ProfilePage } from '../profile/profile';
import { ModalController, NavParams } from 'ionic-angular';
import { ModalIntroComponent } from '../../components/modal-intro/modal-intro';
import { StorageProvider } from '../../providers/storage/storage';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  wallet;
  provider;
  address;

  tab1Root = ProposalsPage;
  tab2Root = ProfilePage;

  constructor(private walletUtils: WalletUtilsProvider, private modalCtrl: ModalController, private storage: StorageProvider) {

  }

  /**
   * Guard app from starting before wallet initialization is complete
   * @returns {Promise<boolean>}
   */
  async ionViewCanEnter() {

    return new Promise(async (resolve, reject) => {

      // check if RPC url is set
      const rpcUrl = await this.storage.getRPCUrl();

      // if it's set initialize wallet
      if (rpcUrl) {
        await this.walletUtils.initWallet();
        return resolve();
      }

      // if it's not set open an intro modal where it needs to be entered
      let profileModal = this.modalCtrl.create(ModalIntroComponent);
      profileModal.onDidDismiss(data => {
        resolve();
      });
      profileModal.present();

    });


  }

}

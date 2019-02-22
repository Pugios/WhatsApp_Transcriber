import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file';

import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private transfer: FileTransfer,
    private file: File,
    private speechRecognition: SpeechRecognition) { }

  async showToast() {
    const toast = await this.toastCtrl.create({
      message: "Hello from Toast!",
      duration: 2000
    });
    toast.present();
  }

  navigate() {
    this.router.navigateByUrl('/detail')
  }

  // ==========================================
  // UPLOADING A FILE TO BE TRANSCRIBED
  // ==========================================

  const fileTransfer: FileTransferObject = this.transfer.create();

  // Upload a file:
  fileTransfer.upload(..).then(..).catch(..);

  // Download a file:
  fileTransfer.download(..).then(..).catch(..);

  // Abort active transfer:
  fileTransfer.abort();

  // full example
  upload() {
    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: 'name.jpg',
      headers: {}
    }

    fileTransfer.upload('<file path>', '<api endpoint>', options)
      .then((data) => {
        // success
      }, (err) => {
        // error
      })
  }

  download() {
    const url = 'http://www.example.com/file.pdf';
    fileTransfer.download(url, this.file.dataDirectory + 'file.pdf').then((entry) => {
      console.log('download complete: ' + entry.toURL());
    }, (error) => {
      // handle error
    });
  }

  // ==========================================
  // TRANSCRIBE USING SPEECH RECOGNITION
  // ==========================================

  // Check feature available
  this.speechRecognition.isRecognitionAvailable()
  .then((available: boolean) => console.log(available))

  // Start the recognition process
  this.speechRecognition.startListening(options)
    .subscribe(
      (matches: string[]) => console.log(matches),
      (onerror) => console.log('error:', onerror)
    )

  // Stop the recognition process (iOS only)
  this.speechRecognition.stopListening()

  // Get the list of supported languages
  this.speechRecognition.getSupportedLanguages()
    .then(
      (languages: string[]) => console.log(languages),
      (error) => console.log(error)
    )

  // Check permission
  this.speechRecognition.hasPermission()
    .then((hasPermission: boolean) => console.log(hasPermission))

  // Request permissions
  this.speechRecognition.requestPermission()
    .then(
      () => console.log('Granted'),
      () => console.log('Denied')
  )
}
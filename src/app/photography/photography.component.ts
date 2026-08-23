import { Component, HostListener, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SharedService } from '../shared/shared.service';

interface Photo {
  src: string;
  alt: string;
  titleKey?: string;
  storyKey?: string;
  place?: string;
  date?: string;
}

@Component({
  standalone: true,
  selector: 'app-photography',
  imports: [TranslateModule],
  templateUrl: './photography.component.html',
  styleUrls: ['./photography.component.scss'],
})
export class PhotographyComponent {
  private readonly translateService = inject(TranslateService);
  private readonly sharedService = inject(SharedService);

  readonly photos: Photo[] = [
    {
      src: 'assets/images/photography/lot-01/20240207_173426.webp',
      alt: 'Silhouette sur une plage au coucher du soleil',
      titleKey: 'photography.photos.costaRicaSunset.title',
      storyKey: 'photography.photos.costaRicaSunset.story',
      place: 'Costa Rica',
      date: '02/2024',
    },
    {
      src: 'assets/images/photography/lot-01/20240208_174720.webp',
      alt: 'Bateau d’excursion sur la mer au crépuscule',
      titleKey: 'photography.photos.costaRicaBoat.title',
      storyKey: 'photography.photos.costaRicaBoat.story',
      place: 'Costa Rica',
      date: '02/2024',
    },
    {
      src: 'assets/images/photography/lot-01/20240209_090312.webp',
      alt: 'Groupe de singes près d’une terrasse dans la forêt tropicale',
      titleKey: 'photography.photos.costaRicaMonkeys.title',
      storyKey: 'photography.photos.costaRicaMonkeys.story',
      place: 'Costa Rica',
      date: '02/2024',
    },
    {
      src: 'assets/images/photography/lot-01/DSC03692.webp',
      alt: 'Station de l’Aiguille du Midi sous un ciel bleu profond',
      titleKey: 'photography.photos.aiguilleDuMidi.title',
      storyKey: 'photography.photos.aiguilleDuMidi.story',
      place: 'Aiguille du Midi',
      date: '10/2014',
    },
    { src: 'assets/images/photography/lot-01/corridor-lantern.webp', alt: 'Couloir éclairé par une lanterne' },
    { src: 'assets/images/photography/lot-01/train-platform.webp', alt: 'Voyageurs sur le quai d’une gare' },
    { src: 'assets/images/photography/lot-01/balcony-black-white.webp', alt: 'Balcon et paysage urbain en noir et blanc' },
    {
      src: 'assets/images/photography/lot-01/street-black-white.webp',
      alt: 'Circulation dans une rue de Marrakech en noir et blanc',
      titleKey: 'photography.photos.marrakechStreet.title',
      storyKey: 'photography.photos.marrakechStreet.story',
      place: 'Marrakech',
      date: '03/2023',
    },
    { src: 'assets/images/photography/lot-01/IMG_20230813_150214_078.webp', alt: 'Lac turquoise entouré de montagnes' },
    { src: 'assets/images/photography/lot-01/MEITU_20250911_010107010.webp', alt: 'Ombres allongées sur les dunes' },
  ];

  selectedPhoto: Photo | null = null;

  get currentLanguage(): string {
    return this.translateService.currentLang;
  }

  changeLanguage(language: 'fr' | 'en' | 'zh'): void {
    this.translateService.use(language);
    this.sharedService.sendLocaleChanged(language);
  }

  openPhoto(photo: Photo): void {
    this.selectedPhoto = photo;
  }

  closePhoto(): void {
    this.selectedPhoto = null;
  }

  @HostListener('document:keydown.escape')
  closeOnEscape(): void {
    this.closePhoto();
  }
}

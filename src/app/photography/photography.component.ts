import { ChangeDetectorRef, Component, HostListener, inject, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SharedService } from '../shared/shared.service';
import { PhotoLikeState, PhotographyLikeService } from './photography-like.service';

interface Photo {
  id: string;
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
export class PhotographyComponent implements OnInit {
  private readonly translateService = inject(TranslateService);
  private readonly sharedService = inject(SharedService);
  private readonly photographyLikeService = inject(PhotographyLikeService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  likeStates: Record<string, PhotoLikeState> = {};
  readonly pendingPhotoIds = new Set<string>();

  readonly photos: Photo[] = [
    {
      id: 'costa-rica-sunset',
      src: 'assets/images/photography/lot-01/20240207_173426.webp',
      alt: 'Silhouette sur une plage au coucher du soleil',
      titleKey: 'photography.photos.costaRicaSunset.title',
      storyKey: 'photography.photos.costaRicaSunset.story',
      place: 'Costa Rica',
      date: '02/2024',
    },
    {
      id: 'costa-rica-boat',
      src: 'assets/images/photography/lot-01/20240208_174720.webp',
      alt: 'Bateau d’excursion sur la mer au crépuscule',
      titleKey: 'photography.photos.costaRicaBoat.title',
      storyKey: 'photography.photos.costaRicaBoat.story',
      place: 'Costa Rica',
      date: '02/2024',
    },
    {
      id: 'costa-rica-monkeys',
      src: 'assets/images/photography/lot-01/20240209_090312.webp',
      alt: 'Groupe de singes près d’une terrasse dans la forêt tropicale',
      titleKey: 'photography.photos.costaRicaMonkeys.title',
      storyKey: 'photography.photos.costaRicaMonkeys.story',
      place: 'Costa Rica',
      date: '02/2024',
    },
    {
      id: 'aiguille-du-midi',
      src: 'assets/images/photography/lot-01/DSC03692.webp',
      alt: 'Station de l’Aiguille du Midi sous un ciel bleu profond',
      titleKey: 'photography.photos.aiguilleDuMidi.title',
      storyKey: 'photography.photos.aiguilleDuMidi.story',
      place: 'Aiguille du Midi',
      date: '10/2014',
    },
    {
      id: 'corridor-lantern',
      src: 'assets/images/photography/lot-01/corridor-lantern.webp',
      alt: 'Couloir ancien éclairé par une lanterne à Marrakech',
      titleKey: 'photography.photos.corridorLantern.title',
      storyKey: 'photography.photos.corridorLantern.story',
      place: 'Marrakech',
      date: '02/2022',
    },
    { id: 'train-platform', src: 'assets/images/photography/lot-01/train-platform.webp', alt: 'Voyageurs sur le quai d’une gare' },
    { id: 'balcony-black-white', src: 'assets/images/photography/lot-01/balcony-black-white.webp', alt: 'Balcon et paysage urbain en noir et blanc' },
    {
      id: 'marrakech-street',
      src: 'assets/images/photography/lot-01/street-black-white.webp',
      alt: 'Circulation dans une rue de Marrakech en noir et blanc',
      titleKey: 'photography.photos.marrakechStreet.title',
      storyKey: 'photography.photos.marrakechStreet.story',
      place: 'Marrakech',
      date: '03/2023',
    },
    { id: 'mountain-lake', src: 'assets/images/photography/lot-01/IMG_20230813_150214_078.webp', alt: 'Lac turquoise entouré de montagnes' },
    { id: 'desert-shadows', src: 'assets/images/photography/lot-01/MEITU_20250911_010107010.webp', alt: 'Ombres allongées sur les dunes' },
  ];

  selectedPhoto: Photo | null = null;

  ngOnInit(): void {
    this.photographyLikeService.getAll().subscribe({
      next: (states) => {
        this.likeStates = states;
        this.changeDetectorRef.detectChanges();
      },
      error: () => {
        // Une panne du compteur ne doit jamais empêcher de consulter la galerie.
      },
    });
  }

  get currentLanguage(): string {
    return this.translateService.currentLang;
  }

  changeLanguage(language: 'fr' | 'en' | 'zh'): void {
    this.translateService.use(language);
    this.sharedService.sendLocaleChanged(language);
  }

  isLiked(photo: Photo): boolean {
    return this.likeStates[photo.id]?.liked ?? false;
  }

  toggleLike(photo: Photo): void {
    if (this.pendingPhotoIds.has(photo.id)) {
      return;
    }

    const previous = this.likeStates[photo.id] ?? { count: 0, liked: false };
    const nextLiked = !previous.liked;
    this.likeStates = {
      ...this.likeStates,
      [photo.id]: {
        count: Math.max(0, previous.count + (nextLiked ? 1 : -1)),
        liked: nextLiked,
      },
    };
    this.pendingPhotoIds.add(photo.id);

    const request = nextLiked
      ? this.photographyLikeService.like(photo.id)
      : this.photographyLikeService.unlike(photo.id);
    request.subscribe({
      next: (state) => {
        this.likeStates = { ...this.likeStates, [photo.id]: state };
        this.changeDetectorRef.detectChanges();
      },
      error: () => {
        this.likeStates = { ...this.likeStates, [photo.id]: previous };
        this.pendingPhotoIds.delete(photo.id);
        this.changeDetectorRef.detectChanges();
      },
      complete: () => {
        this.pendingPhotoIds.delete(photo.id);
        this.changeDetectorRef.detectChanges();
      },
    });
  }

  likeCount(photo: Photo): number {
    return this.likeStates[photo.id]?.count ?? 0;
  }

  openPhoto(photo: Photo): void {
    this.selectedPhoto = photo;
  }

  closePhoto(): void {
    this.selectedPhoto = null;
  }

  closePhotoFromImage(): void {
    if (window.matchMedia('(max-width: 800px)').matches) {
      this.closePhoto();
    }
  }

  @HostListener('document:keydown.escape')
  closeOnEscape(): void {
    this.closePhoto();
  }
}

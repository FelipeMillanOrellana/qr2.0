import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ProfesorPage } from './profesor.page';

describe('ProfesorPage', () => {
  let component: ProfesorPage;
  let fixture: ComponentFixture<ProfesorPage>;
  let mockRouter: jest.Mocked<Router>;

  beforeEach(() => {
    // Crear un mock para el Router
    mockRouter = {
      navigate: jest.fn(),
      navigateByUrl: jest.fn(),
    } as unknown as jest.Mocked<Router>;

    TestBed.configureTestingModule({
      declarations: [ProfesorPage],
      providers: [{ provide: Router, useValue: mockRouter }],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfesorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should register a new subject', () => {
    component.nuevaAsignatura = {
      id: '',
      nombre: 'Matemáticas',
      seccion: 'A1',
      year: 2024,
      semester: 1,
      campus: 'Campus Norte',
      code: 'MAT101',
      profesorId: '123',
      modality: 'Presencial',
    };
    component.registrarAsignatura();
    expect(component.asignaturas.length).toBe(1);
    expect(component.asignaturas[0].nombre).toBe('Matemáticas');
    expect(component.asignaturas[0].seccion).toBe('A1');
  });

  it('should generate a QR code for a subject', () => {
    const asignatura = {
      id: '1',
      nombre: 'Historia',
      seccion: 'B2',
      year: 2024,
      semester: 2,
      campus: 'Campus Sur',
      code: 'HIS202',
      profesorId: '456',
      modality: 'Online',
    };
    component.generarQRAsignatura(asignatura);
    expect(component.qrData).toContain('"nombre":"Historia"'); // Verifica contenido del JSON
    expect(component.qrData).toContain('"seccion":"B2"');
    expect(component.qrData).toContain('"year":2024');
    expect(component.isQRCodeVisible).toBe(true);
  });

  it('should hide the QR code', () => {
    component.isQRCodeVisible = true;
    component.hideQRCode();
    expect(component.isQRCodeVisible).toBe(false);
  });

  it('should navigate to contact page', () => {
    component.goToContacto();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/contacto'], {
      queryParams: { from: 'profesor', usuario: 'Profesor' },
    });
  });

  it('should navigate to login page on logout', () => {
    component.logOut();
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/login', { replaceUrl: true });
  });
});
